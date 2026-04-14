import { Component, signal, OnInit } from '@angular/core';
import { HourlyCard } from './hourly-card/hourly-card';
import { DailyCard } from './daily-card/daily-card';
import { CurrentCard } from './current-card/current-card';
import { HttpClient } from '@angular/common/http';
import { OpenMeteo } from './services/open-meteo';
import { DateTime } from 'luxon'

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [HourlyCard, DailyCard, CurrentCard],
  styleUrl: './app.scss'
})
export class App implements OnInit{
  constructor(private http: HttpClient, private openMeteo: OpenMeteo){}

  protected readonly title = signal('daweather');

  // PROD ENDPOINTS
  // ipEndpoint = 'https://daweather.meeyida.com/ip.php';
  // cityEndpoint = 'https://daweather.meeyida.com/city.php';

  //DEVELOPMENT ENDPOINTS
  ipEndpoint = '/ip-api';
  cityEndpoint = '/city-api';

  userDetails: any;
  userIp: string = '';
  weatherData: any;
  timeZone:string = '';
  hourlyData:any = {
    temperature_2m: [],
    time: [],
    weather_code: []
  };

  ngOnInit(): void {
    this.getUserTimezone();
    this.getForecastData();
  }

  getForecastData(){
    //Get User's Ip address
    this.http.get(this.ipEndpoint).subscribe({
      next: (userIp: any) => {
        this.userIp = userIp['ip']
        //Get User's Network and location data
        this.http.get(`${this.cityEndpoint}?ip=${this.userIp}`).subscribe({
          next: (data: any)=>{
            this.userDetails = data;
            // Using the longitude and latitude fetched, provide an estimate weather forecast of that location
            this.openMeteo.getWeatherData(this.userDetails.lat, this.userDetails.lon, this.timeZone).then(resp =>{
              this.weatherData = resp;

              //Process hourly data
              this.proccessHourlyForecast(this.weatherData)
              console.log(resp)
            })
          },
          error: ()=>{
            this.fallBackLocator();
          }
        })
      },
      error: () => {
        this.fallBackLocator();
      }
    })
  }

  proccessHourlyForecast(data: any){
    let earlyHourIndex = 0;
    //latestHour would be gotten by using earlyHourIndex + 24
    let latestHourIndex = 0;
    //Get the index of the earliest hour to start on using the current time
    for(let index = 0; index < data['hourly']['time'].length; index++) {
        const now = Date.now()
        const forecastHour = new Date(data['hourly']['time'][index])
        if(forecastHour.getTime() > now){
          earlyHourIndex = index;
          latestHourIndex = earlyHourIndex + 24; 
          break
        }
    }

    //Create a newly formatted structure to get only the needed hourly forecast data
    for(let index = earlyHourIndex; index < latestHourIndex; index++){
      this.hourlyData.temperature_2m.push(data['hourly']['temperature_2m'][index]);
      this.hourlyData.time.push(data['hourly']['time'][index]);
      this.hourlyData.weather_code.push(data['hourly']['weather_code'][index]);
    }
  }

  getUserTimezone(){
    this.timeZone = DateTime.local().toFormat('ZZZZ')
    // alert(DateTime.local().toFormat('ZZZZ'))
  }

  fallBackGetWeatherData(position: any){
    this.openMeteo.getWeatherData(position.coords.latitude, position.coords.longitude, "GMT").then(resp =>{
      this.weatherData = resp;
      //Process hourly data
      this.proccessHourlyForecast(this.weatherData)
      console.log(resp);
    })
  }

  getPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  fallBackLocator(){
    if(!navigator.geolocation){
      alert("Your browser does not support Geolocation")
    }else{
      // navigator.geolocation.getCurrentPosition(this.fallBackGetWeatherData)
      this.getPosition()
      .then(position => this.fallBackGetWeatherData(position))
      .catch(err => console.error(err));
    }
  }
  
}
