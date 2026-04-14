import { Component,OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-current-card',
  imports: [ DecimalPipe ],
  templateUrl: './current-card.html',
  styleUrl: './current-card.scss',
})
export class CurrentCard implements OnInit{
  constructor(private http: HttpClient){}

  @Input({required: true}) ipEndpoint = '';
  @Input({required: true}) cityEndpoint = '';
  @Input({required: true}) weatherData: any;

  userCity: string = '';

  weatherCodes: Record<number, string> = {
    0: "Clear sky",

    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",

    45: "Fog",
    48: "Rime fog",

    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Heavy drizzle",

    56: "Light freezing drizzle",
    57: "Heavy freezing drizzle",

    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",

    66: "Light freezing rain",
    67: "Heavy freezing rain",

    71: "Light snowfall",
    73: "Moderate snowfall",
    75: "Heavy snowfall",

    77: "Snow grains",

    80: "Light rain showers",
    81: "Moderate rain showers",
    82: "Heavy rain showers",

    85: "Light snow showers",
    86: "Heavy snow showers",

    95: "Thunderstorm",
    96: "Thunderstorm with light hail",
    99: "Thunderstorm with heavy hail"
  };

  weatherImg: any = {
    0: 'images/animated/day.svg',
    1: 'images/animated/cloudy-day-1.svg',
    2: 'images/animated/cloudy-day-2.svg',
    3: 'images/animated/cloudy-day-3.svg',
    45: 'images/animated/cloudy.svg',
    48: 'images/animated/cloudy.svg',
    51: 'images/animated/rainy-1.svg',
    53: 'images/animated/rainy-1.svg',
    55: 'images/animated/rainy-1.svg',
    56: 'images/animated/rainy-5.svg',
    57: 'images/animated/rainy-5.svg',
    61: 'images/animated/rainy-2.svg',
    63: 'images/animated/rainy-3.svg',
    65: 'images/animated/rainy-6.svg',
    66: 'images/animated/rainy-4.svg',
    67: 'images/animated/rainy-6.svg',
    71: 'images/animated/snowy-2.svg',
    73: 'images/animated/snowy-1.svg',
    75: 'images/animated/snowy-6.svg',
    77: 'images/animated/rainy-7.svg',
    80: 'images/animated/rainy-2.svg',
    81: 'images/animated/rainy-3.svg',
    82: 'images/animated/rainy-6.svg',
    85: 'images/animated/snowy-2.svg',
    86: 'images/animated/snowy-6.svg',
    95: 'images/animated/thunder.svg',
    96: 'images/animated/thunder.svg',
    99: 'images/animated/thunder.svg'
  }

  weatherImgNight: any = {
    0: 'images/animated/night.svg',
    1: 'images/animated/cloudy-night-1.svg',
    2: 'images/animated/cloudy-night-2.svg',
    3: 'images/animated/cloudy-night-3.svg',
    45: 'images/animated/cloudy-night.svg',
    48: 'images/animated/cloudy-night.svg',
    51: 'images/animated/rainy-5.svg',
    53: 'images/animated/rainy-5.svg',
    55: 'images/animated/rainy-5.svg',
    56: 'images/animated/rainy-5.svg',
    57: 'images/animated/rainy-5.svg',
    61: 'images/animated/rainy-4.svg',
    63: 'images/animated/rainy-5.svg',
    65: 'images/animated/rainy-6.svg',
    66: 'images/animated/rainy-4.svg',
    67: 'images/animated/rainy-6.svg',
    71: 'images/animated/snowy-4.svg',
    73: 'images/animated/snowy-5.svg',
    75: 'images/animated/snowy-6.svg',
    77: 'images/animated/rainy-7.svg',
    80: 'images/animated/rainy-4.svg',
    81: 'images/animated/rainy-5.svg',
    82: 'images/animated/rainy-6.svg',
    85: 'images/animated/snowy-2.svg',
    86: 'images/animated/snowy-6.svg',
    95: 'images/animated/thunder.svg',
    96: 'images/animated/thunder.svg',
    99: 'images/animated/thunder.svg'
  }

  ngOnInit(): void {
    this.getUserCity();
  }

  getUserCity(){
    //Get User's IP address
    this.http.get(this.ipEndpoint).subscribe({
      next: (userIp: any) => {
        const ip = userIp['ip']
        //Get User City
        this.http.get(`${this.cityEndpoint}?ip=${ip}`).subscribe({
          next: (data: any)=>{
            this.userCity = data['city'];
          },
          error: () => {
            this.userCity = "Current Location";
          }
        })
      },
      error: () => {this.userCity = "Current Location"}
    })
  }
}
