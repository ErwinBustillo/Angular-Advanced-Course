import { Component, OnInit,OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry,map, filter } from 'rxjs/operators';
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit,OnDestroy {


  subscription:Subscription;

  constructor() {

    // this.regresaObservable().pipe(
    //   retry(2)
    // )
     this.subscription = this.regresaObservable()
    .subscribe( 
      numero => console.log('subs',numero), // el next
      error => console.error('error en el obs',error), // el error
      ()=> console.log('El observador termino!') //termina
    );
  }

  ngOnInit() {

  }

  ngOnDestroy(){
     this.subscription.unsubscribe();
  }

  regresaObservable():Observable<any>{
      return new Observable( observer => {
        let contador = 0;
        let intervalo = setInterval(()=> {
          contador += 1;

          const salida = {
            valor:contador
          }
          observer.next(salida); // cada vez que se quiera notificar algo nuevo

          // if (contador == 3) {
          //   clearInterval(intervalo);
          //   observer.complete(); // finaliza el observable
          // }

          // if (contador == 2) {
          //   //clearInterval(intervalo);
          //   observer.error('Auxilio!');
          // }
  
        },1000);
      }).pipe(
            map( (resp:any) => resp.valor),
            filter((valor,index)=> {
              //console.log('Filter',valor,index);
              if (valor % 2 == 1) {
                //impar
                return true
              }
              else {
                //par
                return false
              }
            })
        )
  }



}
