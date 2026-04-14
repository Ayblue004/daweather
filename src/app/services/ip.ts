import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Ip {

  constructor(private http: HttpClient){}

  // PROD ENDPOINTS
  // ipEndpoint = 'https://daweather.meeyida.com/ip.php';
  // cityEndpoint = 'https://ipapi.co/';

  //DEVELOPMENT ENDPOINTS
  ipEndpoint = '/ip-api';
  cityEndpoint = 'https://ipapi.co/';

  getUserCity(){
    //Get User's IP address
    this.http.get(this.ipEndpoint).subscribe({
      next: (userIp: any) => {
        const ip = userIp['ip']
        //Get User City
        this.http.get(`${this.cityEndpoint}/${ip}/json`).subscribe({
          next: (data: any)=>{
            return data['city']
          },
          error: () => {return ''}
        })
      },
      error: () => {return ''}
    })
  }
}
