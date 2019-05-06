import { Component, OnInit, Input, Output, EventEmitter, ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('nombre') leyenda:string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output('actualiza') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
      //console.log('Leyenda', this.leyenda);
      //console.log('PRogreso', this.progreso);
  }

  ngOnInit() {
    //console.log('Leyenda', this.leyenda);
    //console.log('PRogreso', this.progreso);

  }

  changeValue(value):void{

    if (this.progreso >= 100 && value > 0) {
      this.progreso = 100;
      return;
    }
    if (this.progreso <=0 && value < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso += value;

    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }

  onChanges(newValue:number){

      //let elemHtml:any = document.getElementsByName('progreso')[0];

      if (newValue >= 100) {
        this.progreso = 100;
      }
      else if (newValue <=0){
        this.progreso = 0;
      } else{
        this.progreso = newValue;
      }

      this.txtProgress.nativeElement.value = this.progreso;

      this.cambioValor.emit(this.progreso);
  }

}
