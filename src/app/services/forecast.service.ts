import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Subject, Observable} from "rxjs/index";

import {environment} from "src/environments/environment";
import {Coords} from "src/app/structures/coords.structure";
import {map} from "rxjs/internal/operators";
import {Weather} from "src/app/structures/weather.structure";
import {GeolocationService} from "src/app/services/geolocation.service";

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  /*
  *
  *  //observable  => objeto que nos sobrescribimos
    //obserserver  => usa una interfaz observer que se utilizan como subscriptores de los obersvables

  * */

  public weatherSubject: Subject<any> = new Subject<any>();
  //aca es un observable
  public weather$: Observable<any> = this.weatherSubject.asObservable();
  public coordsService: Coords;

  constructor(private http: HttpClient, private _geolocationService:GeolocationService) {



    this.weather$ = this.weatherSubject.asObservable().pipe(
      map(
        this.structureData   //recibe la funcion y como parametro la respuesta del map
      )
    );


    this._geolocationService.coords$.subscribe(
      (coordenadas) => {
        this.get(coordenadas);
      }
    )

    /*this.get({
      lat: 4.710989,
      lon: -74.072090
    });*/

  }


  structureData(data: any) {

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


      //
      if (!tempPerDay.cod || hours == 16) {
        let source = weatherObject.weather[0];

        //console.log(source);
        //destructuracion de objetos
        // {...a, ...b}  los objetos de b se acomodaran en los indices del a
        tempPerDay = {...tempPerDay, ...source};

        //se hace por fuera y no se hace con la desctructuracion ya que el nombre del indice es diferente y se debe hacer manual
        tempPerDay.cod = source.id;

        tempPerDay.name = data.city.name;

      }


      if (!tempPerDay.minMaxTemp.min || (tempPerDay.minMaxTemp.min > weatherObject.main.temp_min)) {
        tempPerDay.minMaxTemp.min = weatherObject.main.temp_min;
      }

      if (!tempPerDay.minMaxTemp.max || (tempPerDay.minMaxTemp.max < weatherObject.main.temp_max)) {
        tempPerDay.minMaxTemp.max = weatherObject.main.temp_max;
      }


      //console.log(tempPerDay)
      //pusheamos la clave al objeto con los valores seteados
      minMaxPerDay[key] = tempPerDay;

    });



    //Objet.values(objeto) permite trasnformas todos los valores de los objetos y pushearlos en un arreglo
    return Object.values(minMaxPerDay);

  }


  get(coords: Coords) {
    let argumentos: string = 'forecast?lat=' + coords.lat + '&lon=' + coords.lon + "&APPID=" + environment.key + '&units=metric';
    let observable = this.http.get(environment.endpoint + argumentos).subscribe(
      this.weatherSubject   //aca es un observer
    );

  }
}
