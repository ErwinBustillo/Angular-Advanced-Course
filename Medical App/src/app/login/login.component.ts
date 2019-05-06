import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

declare function init_plugins();
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame:boolean = false;
  email:string;
  auth2:any;

  constructor(public router:Router,
    public _usuarioService:UsuarioService) {

   }

  ngOnInit() {
      init_plugins();
      this.googleInit();
      this.email = localStorage.getItem('email') || '';
      if (this.email.length > 1) {
        this.recuerdame = true;
      }
  }

  googleInit(){
    gapi.load('auth2', ()=> {
        this.auth2 = gapi.auth2.init({
          client_id: '478250541444-saggd1ptcjkhsn1ugnjkjvdihsqfqvrn.apps.googleusercontent.com',
          cookiepolicy:'single_host_origin',
          scope: 'profile email'
        });
        this.attachSignIn(document.getElementById('btnGoogle'));

    });
  }

  attachSignIn(element){
    this.auth2.attachClickHandler(element, {}, (googleUser)=>{
        let token = googleUser.getAuthResponse().id_token;
      //let profile = googleUser.getBasicProfile();
       // console.log(profile);
       this._usuarioService.loginGoogle(token)
          .subscribe(()=> this.router.navigate(['/dashboard']));
          
       console.log(token);
    });
  }

  ingresar(forma: NgForm):void{
      //this.router.navigate(['/dashboard']);
      if (forma.invalid) {
        return;
      }

      let usuario = new Usuario(null,forma.value.email,forma.value.password);
      this._usuarioService.login(usuario,this.recuerdame)
          .subscribe(correcto => this.router.navigate(['/dashboard']));
      /*console.log(forma.valid);
      console.log(forma.value);*/
  }

}
