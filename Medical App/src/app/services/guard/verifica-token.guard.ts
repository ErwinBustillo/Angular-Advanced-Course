import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
  
  constructor(private usuarioService:UsuarioService, private router:Router){}

  canActivate(): Promise<boolean> | boolean {
    console.log('INICI TOKEN GUARD');
    let token = this.usuarioService.token;
    let payload = JSON.parse(atob(token.split('.')[1]));

    let expirado = this.expirado(payload.exp);
    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.verificaRenueva(payload.exp);
  }


  verificaRenueva(fechaExp:number):Promise<boolean>{
    return new Promise((resolve,reject)=>{
      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();

      ahora.setTime(ahora.getTime() + (4*60*60*1000));

     // console.log(tokenExp);
      //console.log(ahora);
      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      }else{ // token proximo a vencerse
          this.usuarioService.renuevaToken().subscribe(()=>{
            resolve(true);
          },()=>{
            this.router.navigate(['/login']);
            reject(false);
          });
      }
      resolve(true);
    })
  }

  expirado(fechaExp:number){
    let ahora = new Date().getTime() / 1000;
    if (fechaExp < ahora) {
      return true;
    }else{
      return false;
    }
  }


}
