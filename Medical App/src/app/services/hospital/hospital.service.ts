import { Hospital } from './../../models/hospital.model';
import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http:HttpClient) {
    
  }

  cargarHospitales(desde:number = 0){
    let url = URL_SERVICIOS + '/hospital?desde='+ desde;

    return this.http.get(url)
  }

  obtenerHospital(id:string){
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
      .pipe(map((resp:any)=> resp.hospital));

  }

  borrarHospital(id:string){
    let url = URL_SERVICIOS + '/hospital/' + id + '?token=' + localStorage.getItem('token');
    return this.http.delete(url)
  }

  crearHospital(nombre:string){
    let url = URL_SERVICIOS + '/hospital?token=' + localStorage.getItem('token');
    return this.http.post(url,{nombre})
  }

  buscarHospital(termino:string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/'+termino;

    return this.http.get(url)
        .pipe(map( (resp:any)=> resp.hospitales));
  }

  actualizarHospital(hospital:Hospital){
    let url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + localStorage.getItem('token');

    return this.http.put(url,hospital);
  }

}
