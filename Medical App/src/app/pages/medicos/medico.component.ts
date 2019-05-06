import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { MedicoService,HospitalService } from './../../services/service.index';
import { Hospital } from './../../models/hospital.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Medico } from 'src/app/models/medico.model';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales:Hospital[] = [];
  medico:Medico = new Medico('','','','','');
  hospital:Hospital = new Hospital('');


  constructor(private hospitalService:HospitalService, private medicoService:MedicoService, private router:Router, private ActivatedRoute:ActivatedRoute,private mus:ModalUploadService) {
    this.ActivatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id != 'nuevo') {
        this.cargarMedico(id);
      }
    })
  }

  ngOnInit() {
    this.hospitalService.cargarHospitales().subscribe( (data:any) => {
      this.hospitales = data.hospitales
    });

    this.mus.notificacion.subscribe( (resp:any) => {
      this.medico.img = resp.medico.img;
    })
  }

  cargarMedico(id:string){
    this.medicoService.cargarMedico(id).subscribe(medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }
  guardarMedico(f:NgForm){
    if (f.invalid) {
      return;
    }

    this.medicoService.guardarMedico(this.medico).subscribe( medico => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id])
    });

  }

  cambioHospital(id:string){

    this.hospitalService.obtenerHospital(id).subscribe( (hospital:Hospital) => this.hospital = hospital)
  }

  cambiarFoto(){
      this.mus.mostrarModal('medicos', this.medico._id);
  }

}
