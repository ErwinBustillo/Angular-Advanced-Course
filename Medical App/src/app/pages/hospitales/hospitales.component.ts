import { HospitalService } from './../../services/hospital/hospital.service';
import { Hospital } from './../../models/hospital.model';
import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { Component, OnInit } from '@angular/core';
//import swal from 'sweetalert';

declare var swal:any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales:Hospital[] = [];
  desde:number = 0;
  total:number = 0;

  cargando:boolean = true;

  constructor(private mus:ModalUploadService, private hospitalService:HospitalService) { }

  ngOnInit() {
    this.cargarHospitales();

    this.mus.notificacion.subscribe( resp =>{
      this.cargarHospitales();
    })
  }

  mostrarModal(id:string){
    this.mus.mostrarModal('hospitales',id);
  }

  cargarHospitales(){
    this.cargando = true;
    this.hospitalService.cargarHospitales(this.desde)
      .subscribe((data:any) =>{
        this.total = data.total;
        this.hospitales = data.hospitales;
        this.cargando = false;
      });
  }

  buscarHospital(termino:string){
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    //console.log(termino);
    this.cargando = true;

    this.hospitalService.buscarHospital(termino).subscribe((hospitales:Hospital[]) => {
      this.hospitales = hospitales;
      this.cargando = false;
    })
  }

  borrarHospital(h:Hospital){
   
    swal({
      title: 'Estas seguro?',
      text: 'Esta a punto de borrar a ' +h.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( borrar => {

      if (borrar) {
        this.hospitalService.borrarHospital(h._id).subscribe( borrado => {
          this.cargarHospitales();
        });
      }
    });
  }

  guardarHospital(h:Hospital){
    this.hospitalService.actualizarHospital(h).subscribe();
  }

  crearHospital(){
    swal({
      title: 'Crear hospital',
      text: 'Digite el nombre',
      icon: 'warning',
      buttons: true,
      dangerMode: false,
      content: 'input'
      
    }).then( crear => {
      console.log(crear);
      if (crear) {
        this.hospitalService.crearHospital(crear).subscribe( resp => {
          this.cargarHospitales();
          swal('Hospital creado', 'El hospital se registro correctamente', 'success');
        });
      }
    });
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
    this.cargarHospitales();
}

}
