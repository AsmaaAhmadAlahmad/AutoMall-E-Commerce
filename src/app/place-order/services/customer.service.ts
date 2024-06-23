import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { HandleErrosServices } from '../../shared/services/handleError.services';
import { CustomerModel } from '../models/customer-model';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseApi = 'https://localhost:7137/api/Customers/';
  constructor(private router: Router,
              private http:HttpClient,
              private handleError:HandleErrosServices) {}





  addCustomer(model:CustomerModel): Observable<any> {
    return this.http.post(this.baseApi,model).pipe(
                catchError(this.handleError.handleError)
     )
   }
  }
