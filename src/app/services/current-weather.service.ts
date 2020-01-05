import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Subject, Observable} from "rxjs/index";

import {environment} from "src/environments/environment";
import {Coords} from "src/app/structures/coords.structure";

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {
/*
*
*  //observable  => objeto que nos sobrescribimos
  //obserserver  => usa una interfaz observer que se utilizan como subscriptores de los obersvables

* */

  public weatherSubject : Subject<any> = new Subject<any>();
  //aca es un observable
  public weather$: Observable<any> = this.weatherSubject.asObservable();

  constructor(private http:HttpClient) {

    //this.getTest();
    this.get({
      lat: 4.710989,
      lon: -74.072090
    });
  }


  getTest(){
    let observable = this.http.get('https://jsonplaceholder.typicode.com/todos').subscribe(
      this.weatherSubject   //aca es un observer
    );
    setTimeout(() => {
      this.weatherSubject.next({});  //podemos emitir mas valores con el next al ser un Sujeto
    })
  }


  get(coords:Coords){
    let argumentos:string = '?lat=' + coords.lat + '&lon=' + coords.lon + "&APPID=" +environment.key+ '&units=metric';
    let observable = this.http.get(environment.endpoint + argumentos).subscribe(
      this.weatherSubject   //aca es un observer
     );

  }




}
