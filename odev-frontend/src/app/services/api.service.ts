import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }

  apiUrl = 'https://localhost:7295/api/Coordinates';

  async create(coordinates_data: any){

   
    var data = {name:"deneme", number:1, coordinates: coordinates_data}
    
var _data = JSON.stringify(data);
debugger;


const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    var observable = this.httpClient.post(this.apiUrl, _data, {headers: headers})

    await firstValueFrom(observable);
  }



}

/*

[
    [
        3328021.2812395273,
        4733595.1364028435
    ],
    [
        3313345.3718087734,
        4530578.389277415
    ],
    [
        3548159.9227008345,
        4533024.374182541
    ],
    [
        3545713.937795709,
        4721365.211877216
    ],
    [
        3328021.2812395273,
        4733595.1364028435
    ]
]

*/