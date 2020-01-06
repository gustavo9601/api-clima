import {Injectable} from '@angular/core';
import {Coords} from "src/app/structures/coords.structure";
import {Observable, Subject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {


  public coordsSubject$ : Subject<Coords> = new Subject<Coords>();
  public coords$ : Observable<Coords> = this.coordsSubject$.asObservable();  //le asignamos el valor del coordsSubject que cambiara en las funciones de abajo
  public permissions$ : Promise<string>;

  public coordsPromise: Promise<Coords>;

  constructor() {

    //Usaremos esta variable para consultar si ya tenemos permisos de geolocation
    this.permissions$ = (navigator as any).permissions.query({name: 'geolocation'})
      .then(permission => permission.state);  //le asginamos lo que el navefador resuelva en el permission.state
  }


  requestGeolocation() {

    //si la variable es nula o undefined
    //de esta forma validamos si ya se llamo antes la promesa, utilizar la ultima respuesta generada
    if(!this.coordsPromise){
      this.coordsPromise =  this.getGeolocation();
    }

    this.coordsPromise.then(
      (coordenadas) => {
        //Recibimos la respuesta de la promesa, y con el sujeto le enviamos al coorsubject el valor
        this.coordsSubject$.next(coordenadas);
      }
    )



  }

  getGeolocation(): Promise<Coords> {
    return new Promise((resolve, reject) => {
      //validamos que el objeto navigator lo contenga el navegador
      if (!navigator || !('geolocation' in navigator)) {
        return reject('La geolocalizacion no esta disponible');
      }

      //capturamos los valores de la geolocalizacion

      //navigator.geolocation   usamos en typscritp (navigator as any).geolocation  para que no se queje que no lo encuentra
      (navigator as any).geolocation.getCurrentPosition((position) => {
        resolve({  //devolvemos un objeto que cumpla con la estructura de la interface Coords
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
      })

    });
  }



}
