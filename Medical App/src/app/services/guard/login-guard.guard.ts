import { UsuarioService } from '../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(public router:Router,public _usuarioService:UsuarioService){}
  canActivate(){
   // console.log('Paso por el login Guard');
    if(this._usuarioService.estaLogueado()){
      //console.log('paso el guard');
      return true;
    }else{
     // console.log('bloqueado por el Guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
