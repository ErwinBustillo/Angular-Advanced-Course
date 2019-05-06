import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public oculto:string = 'oculto';
  public tipo:string;
  public id:string;


  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('MODAL SERVICE');
  }

  ocultarModal(){
    this.tipo = null;
    this.id = null;
    this.oculto = 'oculto';
  }

  mostrarModal(tipo:string, id: string){
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }
}
