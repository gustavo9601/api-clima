import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Subject, Observable} from "rxjs/index";

import {environment} from "src/environments/environment";
import {Coords} from "src/app/structures/coords.structure";
import {map} from "rxjs/internal/operators";
import {Weather} from "src/app/structures/weather.structure";

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  /*
  *
  *  //observable  => objeto que nos sobrescribimos
    //obserserver  => usa una interfaz observer que se utilizan como subscriptores de los obersvables

  * */

  public weatherSubject : Subject<any> = new Subject<any>();
  //aca es un observable
  public weather$: Observable<any> = this.weatherSubject.asObservable();
  constructor(private http: HttpClient) {
    this.weather$ = this.weatherSubject.asObservable().pipe(
      map(
        this.structureData   //recibe la funcion y como parametro la respuesta del map
      )
    );

    this.get({
      lat: 4.710989,
      lon: -74.072090
    });

  }


  structureData(data:any){

    let minMaxPerDay = {};

    data.list.forEach(weatherObject => {
      let date = new Date(weatherObject.dt * 1000);  //.dt retorna microtime y al multiplacrlo por 1000 nos muestra una fecha lejible

      let hours = date.getHours();
      let month = date.getMonth();
      let day = date.getDate();


      let key = month + "-" + day;

      //asginara si tiene valor minMaxPerDay[key] o creara vacio el objeto
      let tempPerDay: Weather = minMaxPerDay[key] || {
          minMaxTemp: {}
      };

      if(tempPerDay.minMaxTemp.min || (tempPerDay.minMaxTemp.min > weatherObject.main.temp_min)){
        tempPerDay.minMaxTemp.min = weatherObject.main.temp_min;
      }

      if(tempPerDay.minMaxTemp.max || (tempPerDay.minMaxTemp.max < weatherObject.main.temp_max)){
        tempPerDay.minMaxTemp.max = weatherObject.main.temp_max;
      }

      //pusheamos la clave al objeto con los valores seteados
      minMaxPerDay[key] = tempPerDay;

    });


    return minMaxPerDay;

  }


  get(coords:Coords){
    let argumentos:string = 'forecast?lat=' + coords.lat + '&lon=' + coords.lon + "&APPID=" +environment.key+ '&units=metric';
    let observable = this.http.get(environment.endpoint + argumentos).subscribe(
      this.weatherSubject   //aca es un observer
    );

  }
}
