import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
//import swal from 'sweetalert';

declare var swal:any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario[] = [];
  desde:number = 0;
  total:number = 0;

  cargando:boolean = true;

  constructor(private usuarioService:UsuarioService, private mus:ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();

    this.mus.notificacion.subscribe( resp =>{
      this.cargarUsuarios();
    })
  }

  mostrarModal(id:string){
    this.mus.mostrarModal('usuarios',id);
  }

  cargarUsuarios(){
      this.cargando = true;

      this.usuarioService.cargarUsuarios(this.desde)
          .subscribe((data:any) =>{
            console.log(data);
            this.total = data.total;
            this.usuarios = data.usuarios;
            this.cargando = false;
          })
  }

  cambiarDesde(valor:number){
      let desde = this.desde + valor;
      
      if (desde >= this.total) {
        return;
      }

      if (desde < 0) {
        return;
      }

      this.desde += valor;
      this.cargarUsuarios();
  }

  buscarUsuario(termino:string){
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    console.log(termino);
    this.cargando = true;

    this.usuarioService.buscarUsuarios(termino).subscribe((usuarios:Usuario[]) => {
      console.log(usuarios);
      this.usuarios = usuarios;
      this.cargando = false;
    })
  }

  borrarUsuario(u:Usuario){
    if (u._id === this.usuarioService.usuario._id) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: 'Estas seguro?',
      text: 'Esta a punto de borrar a ' +u.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( borrar => {

      if (borrar) {
        this.usuarioService.borrarUsuario(u._id).subscribe( borrado => {
          this.cargarUsuarios();
        });
      }
    })
  }

  guardarUsuario(u:Usuario){
    this.usuarioService.actualizarUsuario(u).subscribe();
  }

}
