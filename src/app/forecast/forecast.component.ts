import { Component, OnInit } from '@angular/core';
import {ForecastService} from "src/app/services/forecast.service";

import{showUpStaggered} from "src/app/animations/showUp.animatios";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.sass'],
  animations: [showUpStaggered]
})
export class ForecastComponent implements OnInit {

  constructor(public _forecastService:ForecastService) { }
  ngOnInit() {
  }

}
