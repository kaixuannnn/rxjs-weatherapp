import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, tap } from 'rxjs';
import { filter, map, Observable } from 'rxjs';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-report-component',
  templateUrl: './weather-report-component.component.html',
  styleUrls: ['./weather-report-component.component.scss']
})
export class WeatherReportComponentComponent {
  data$:Observable<any>;
  today = new Date();
  loading = false;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Our route params observable
    this.data$= this.route.params.pipe(
      map(params => params["locationName"]),
      filter(name => !!name),
      tap(()=>{ this.loading = true;}),
      concatMap(name => this.weatherService.getWeatherForCity(name)),
      tap(()=>{ this.loading = false;})
    )
  }
}
