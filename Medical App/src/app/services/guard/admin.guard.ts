import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private usuarioService:UsuarioService, private router:Router){

  }
  canActivate(){
    if (this.usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    }
    else{
      console.log('BLOQUEADO PRO EL ADMIN GUARD');
      this.usuarioService.logout();
      this.router.navigate(['/login']);
      return false;
    }
  }
   
}
