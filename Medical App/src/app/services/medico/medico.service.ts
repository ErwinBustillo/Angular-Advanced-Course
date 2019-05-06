import { Medico } from 'src/app/models/medico.model';
import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  total:number = 0;

  constructor(private http:HttpClient) {

  }

  cargarMedicos(){
    let url = URL_SERVICIOS + '/medico';
    return this.http.get(url)
          .pipe(map( (resp:any)=>{
            this.total = resp.total;
            return resp.medicos;
          }))
  }

  buscarMedicos(termino:string){

    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url)
        .pipe(map( (resp:any)=> resp.medicos))

  }

  borrarMedico(id:string){
    let url  = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + localStorage.getItem('token');

    return this.http.delete(url)
      .pipe(map( (resp:any)=>{
        swal( 'Medico Borrado', 'Medico borrado correctamente', 'success');
        return true;
      }))
  }

  guardarMedico(medico:Medico){
    let url = URL_SERVICIOS + '/medico';
    if (medico._id) {
     url+= '/'+ medico._id;
     url += '?token=' + localStorage.getItem('token');

     return this.http.put(url,medico)
            .pipe(map((resp:any)=>{
              swal('Medico actualizado', medico.nombre, 'success');
              return resp.medico;
            }));
    }else{
      url += '?token=' + localStorage.getItem('token');
      return this.http.post(url,medico)
        .pipe(map( (resp:any)=>{
          swal('Medico creado', medico.nombre, 'success');
          return resp.medico;
        }));
    }
  }

  cargarMedico(id:string){
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url)
      .pipe(map((resp:any)=> resp.medico));
  }

  
}
