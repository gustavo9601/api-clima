import {Injectable} from '@angular/core';
import {Coords} from "src/app/structures/coords.structure";

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {


  public coords$ : Promise<Coords>;
  public permissions$ : Promise<string>;


  constructor() {

    //Usaremos esta variable para consultar si ya tenemos permisos de geolocation
    this.permissions$ = (navigator as any).permissions.query({name: 'geolocation'})
      .then(permission => permission.state);  //le asginamos lo que el navefador resuelva en el permission.state
  }


  requestGeolocation() {
    this.coords$ = this.getGeolocation();
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
