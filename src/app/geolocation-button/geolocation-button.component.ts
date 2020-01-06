import { Component, OnInit } from '@angular/core';
import {GeolocationService} from "src/app/services/geolocation.service";

@Component({
  selector: 'app-geolocation-button',
  templateUrl: './geolocation-button.component.html',
  styleUrls: ['./geolocation-button.component.sass']
})
export class GeolocationButtonComponent implements OnInit {

  public active: boolean = false;

  constructor(private _geolocationService:GeolocationService) { }

  ngOnInit() {

    this._geolocationService.permissions$.then(
      (status) => {


        this.active = (status == 'granted');  //verifica que sea igual a granted y returna true en caso contrario false

        console.log("Status gelocation", status);
        console.log("active", this.active);


        if(this.active){  //si esta activo el permiso de una llamamos el request para obtener la ubicacion
          this._geolocationService.requestGeolocation();
        }

      }
    )
  }

}
