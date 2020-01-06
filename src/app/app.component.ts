import {Component, OnInit} from '@angular/core';
import {GeolocationService} from "src/app/services/geolocation.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'app-clima';

  constructor(private _geolocationService:GeolocationService) {
  }


  ngOnInit() {
  }

}
