import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[] = [];

  // menu:any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       {
  //         titulo: 'Dashboard',
  //         url: '/dashboard'
  //       },
  //       {
  //         titulo: 'ProgressBar',
  //         url: '/progress'
  //       },
  //       {
  //         titulo: 'Gráficas',
  //         url: '/graficas1'
  //       },
  //       {
  //         titulo: 'Promesas',
  //         url: '/promesas'
  //       },
  //       {
  //         titulo: 'RXJS',
  //         url: '/rxjs'
  //       }
  //     ]
  //   },{
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {
  //         titulo: 'Usuarios',
  //         url: '/usuarios'
  //       },
  //       {
  //         titulo: 'Hospitales',
  //         url: '/hospitales'
  //       }, {
  //         titulo: 'Medicos',
  //         url: '/medicos'
  //       }
  //     ]
  //   }
  // ];
  
  constructor(private usuarioService :UsuarioService) {
   
  }

  cargarMenu(){
    this.menu = this.usuarioService.menu;
  }
}
