import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { WatherIconComponent } from './wather-icon/wather-icon.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { ForecastComponent } from './forecast/forecast.component';
import { CargandoComponent } from './cargando/cargando.component';
import { GeolocationButtonComponent } from './geolocation-button/geolocation-button.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    WatherIconComponent,
    WeatherCardComponent,
    ForecastComponent,
    CargandoComponent,
    GeolocationButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
