import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { CoordinateData } from '../contracts/coordinate-data.model';
import { PaginationCoordinateData } from '../contracts/pagination-coordinate-data.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }

  apiUrl = 'https://localhost:7295/api/Coordinates';

  async create(data: Partial<CoordinateData>){

   
    //var data = {name:"deneme", number:1, coordinates: coordinates_data}
    
var _data = JSON.stringify(data);
debugger;


const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    var observable = this.httpClient.post(this.apiUrl, _data, {headers: headers})

    await firstValueFrom(observable);
  }

  async paginationData(page:number, size:number, successCallBack?:() => void, errorCallBack?:(errorMessage) => void){

    const _apiUrl = `${this.apiUrl}/pagination?page=${page}&size=${size}`;

    const observable:Observable<PaginationCoordinateData> = this.httpClient.get<PaginationCoordinateData>(_apiUrl);

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack)
    .catch(errorCallBack)
    return await promiseData;

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