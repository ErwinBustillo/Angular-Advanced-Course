import { Hospital } from './../../models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from './../../models/usuario.model';
import { URL_SERVICIOS } from './../../config/config';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios:Usuario[] = [];
  medicos:Medico[]= [];
  hospitales:Hospital[] = [];

  constructor(private activatedRoute:ActivatedRoute, private http:HttpClient) {
    activatedRoute.params.subscribe(params => {
      let termino = params['termino'];
      this.buscar(termino);
    })
  }

  ngOnInit() {
  }

  buscar(termino:string){
    let url= URL_SERVICIOS + '/busqueda/todo/'+termino;
    this.http.get(url).subscribe((resp:any)=>{
      console.log(resp);
      this.hospitales = resp.hospitales;
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
    })
  }

}
