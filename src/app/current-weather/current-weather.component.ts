import { Component, OnInit } from '@angular/core';
import {CurrentWeatherService} from "src/app/services/current-weather.service";
import {showUp} from "src/app/animations/showUp.animatios";



@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  animations: [showUp]
})
export class CurrentWeatherComponent implements OnInit {

  constructor(public _weatherService: CurrentWeatherService) { }

  ngOnInit() {
    //En este caso apuntamos al weather$ que es en observable que recibe la respuesta desde el servicio en otro observable y la emite
    /*this.weahterService.weather$.subscribe(
      (respuesta) => {
        console.log(respuesta);
      }
    )*/
  }

}
