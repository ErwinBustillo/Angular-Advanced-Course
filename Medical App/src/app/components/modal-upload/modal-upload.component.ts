import { ModalUploadService } from './modal-upload.service';
import { SubirArchivoService } from './../../services/subir-archivo/subir-archivo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp:string;

  constructor(private subirArchivoService:SubirArchivoService, public mus:ModalUploadService) {

  }

  ngOnInit() {
    
  }

  seleccionImagen(archivo:File){
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal('Solo imagenes','El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = ()=> this.imagenTemp = reader.result + '';

  }

  subirImagen(){
      this.subirArchivoService.subirArchivo(this.imagenSubir,this.mus.tipo, this.mus.id)
          .then(resp => {
            this.mus.notificacion.emit(resp);
            this.cerrarModal();
          }).catch( err => {
            console.log('Error en la carga...');
          })
  }

  cerrarModal(){
    this.imagenTemp = null;
    this.imagenSubir = null;
    this.mus.ocultarModal();
  }

}
