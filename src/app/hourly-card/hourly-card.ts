import { Component, Input, OnInit } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-hourly-card',
  imports: [DecimalPipe, DatePipe],
  templateUrl: './hourly-card.html',
  styleUrl: './hourly-card.scss',
})
export class HourlyCard implements OnInit{
  @Input({required: true}) hourlyData: any;

  ngOnInit(): void {
    setTimeout(()=>{
      console.log(this.hourlyData)
    }, 3000)
  }

  //Used to estimate if the sun will be out or not for image selection
  //IMPROVEMENT: use daybreak and sunset data
  isDay(timeString: string): boolean{
    const time = new Date(timeString).getHours();
    if(time < 18 && time > 7){
      return true
    }else{
      return false
    }
  }

  //Vague description of what the weather is
  //Used for alt in images
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
    0: 'images/static/day.svg',
    1: 'images/static/cloudy-day-1.svg',
    2: 'images/static/cloudy-day-2.svg',
    3: 'images/static/cloudy-day.svg',
    45: 'images/static/cloudy.svg',
    48: 'images/static/cloudy.svg',
    51: 'images/static/rainy-1.svg',
    53: 'images/static/rainy-1.svg',
    55: 'images/static/rainy-1.svg',
    56: 'images/static/rainy-5.svg',
    57: 'images/static/rainy-5.svg',
    61: 'images/static/rainy-2.svg',
    63: 'images/static/rainy-3.svg',
    65: 'images/static/rainy-6.svg',
    66: 'images/static/rainy-4.svg',
    67: 'images/static/rainy-6.svg',
    71: 'images/static/snowy-2.svg',
    73: 'images/static/snowy-1.svg',
    75: 'images/static/snowy-6.svg',
    77: 'images/static/rainy-7.svg',
    80: 'images/static/rainy-2.svg',
    81: 'images/static/rainy-3.svg',
    82: 'images/static/rainy-6.svg',
    85: 'images/static/snowy-2.svg',
    86: 'images/static/snowy-6.svg',
    95: 'images/static/thunder.svg',
    96: 'images/static/thunder.svg',
    99: 'images/static/thunder.svg'
  }

  weatherImgNight: any = {
    0: 'images/static/night.svg',
    1: 'images/static/cloudy-night-1.svg',
    2: 'images/static/cloudy-night-2.svg',
    3: 'images/static/cloudy-night.svg',
    45: 'images/static/cloudy-night.svg',
    48: 'images/static/cloudy-night.svg',
    51: 'images/static/rainy-5.svg',
    53: 'images/static/rainy-5.svg',
    55: 'images/static/rainy-5.svg',
    56: 'images/static/rainy-5.svg',
    57: 'images/static/rainy-5.svg',
    61: 'images/static/rainy-4.svg',
    63: 'images/static/rainy-5.svg',
    65: 'images/static/rainy-6.svg',
    66: 'images/static/rainy-4.svg',
    67: 'images/static/rainy-6.svg',
    71: 'images/static/snowy-4.svg',
    73: 'images/static/snowy-5.svg',
    75: 'images/static/snowy-6.svg',
    77: 'images/static/rainy-7.svg',
    80: 'images/static/rainy-4.svg',
    81: 'images/static/rainy-5.svg',
    82: 'images/static/rainy-6.svg',
    85: 'images/static/snowy-2.svg',
    86: 'images/static/snowy-6.svg',
    95: 'images/static/thunder.svg',
    96: 'images/static/thunder.svg',
    99: 'images/static/thunder.svg'
  }

}
