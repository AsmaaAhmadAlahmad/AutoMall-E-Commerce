import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { HandleErrosServices } from '../../shared/services/handleError.services';


@Injectable({
  providedIn: 'root'
})


export class PlaceOrderService {
  baseApi = 'https://localhost:7137/api/Orders/';
  constructor(private router: Router,
              private http:HttpClient,
              private handleError:HandleErrosServices) {}





  CreateOrder(model:any): Observable<any> {
    return this.http.post(this.baseApi,model).pipe(
                catchError(this.handleError.handleError)
     )
   }
  }
