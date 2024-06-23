import { HttpClient, HttpHandler, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HandleErrosServices } from '../../shared/services/handleError.services';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class CommercialStoresService {

  baseApi= 'https://localhost:7137/api/CommercialStores';

  constructor(private http:HttpClient,
              private handleError: HandleErrosServices) { }

  getAllCommercialStores()
  {
    return this.http.get(this.baseApi).pipe(
                      catchError(this.handleError.handleError));
  }



  getCommercialStoreByCategory(categoryId:Guid, pageSize: number, pageNumber: number):Observable<HttpResponse<any>>
  {
    let params = new HttpParams()
    .append('pageSize', pageSize.toString())
    .append('pageNumber', pageNumber.toString());
    return this.http.get(this.baseApi+'/by-category/'+categoryId, { params, observe: 'response' }).pipe(
                       catchError(this.handleError.handleError));
  }



}
