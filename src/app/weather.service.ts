import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherForCity(city: string): Observable<any> {
    const path = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=7d2200757cb43a58258756ef9ff9e61f`;
    return this.http.get(path).pipe(
      map((data:any)=>({
        ...data,
        image: `http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`
      })),
      delay(500)
    );
  }
}
