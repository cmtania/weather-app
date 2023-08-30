import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  baseUrl = environment.httpUrl;

  //private _weatherApi = this.baseUrl + 'api/cities';
  private _weatherApi = this.baseUrl + 'api/weather';

  constructor(private _http: HttpClient) { }

  postCities(cities: any) {
    return this._http.post(this._weatherApi, cities);
  }

}
