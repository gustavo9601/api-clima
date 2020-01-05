import {Component, OnInit} from '@angular/core';
import {CurrentWeatherService} from "src/app/services/current-weather.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'app-clima';

  constructor(private weahterService: CurrentWeatherService) {

  }

  ngOnInit() {

    //En este caso apuntamos al weather$ que es en observable que recibe la respuesta desde el servicio en otro observable y la emite
    this.weahterService.weather$.subscribe(
      (respuesta) => {
        console.log(respuesta);
      }
    )
  }

}
