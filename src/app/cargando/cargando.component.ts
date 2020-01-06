import {Component, OnInit} from '@angular/core';

//animacion
import {loadingAnimation} from "src/app/animations/cargando.animation";
import {CurrentWeatherService} from "src/app/services/current-weather.service";

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  styleUrls: ['./cargando.component.sass'],
  animations: [loadingAnimation()]   //añadiendo animacion al componente
})
export class CargandoComponent implements OnInit {


  _elements: string[] = [
    '#252a34',
    '#ff2e63',
    '#eaffff',
    '#88d9d5',
  ];

  elements: string[] = this._elements;


  constructor(public _currentWeatherService:CurrentWeatherService) {
  }

  ngOnInit() {
    this.set();

  }

  set() {
    this.elements = this._elements;
    this.scheduleNextIteration();

  }

  clear() {
    this.elements = [];
    this.scheduleNextIteration();
  }

  //funcion que se iterara por el setTimeOut para poder generar la animacion de entrada y salida de los colores
  scheduleNextIteration() {
    setTimeout(() => {
      if (this.elements.length == 0) return this.set();  //cada que cumpla el tiempo validara si tiene no tiene elementos se los reasgina

      this.clear();  // en caso contrario de tener elementos los vacia

    }, 100 * this.elements.length + 300)
  }

}
