import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Product } from '../models/product';
import { HandleErrosServices } from '../../shared/services/handleError.services';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class ProductsForCmmercialStoreService {

  constructor(private http:HttpClient
              ,private handleError: HandleErrosServices) { }

  baseApi = 'https://localhost:7137/api/';

  getProductsByCommercialStoreId(commercialStoreId: Guid):Observable<Product[]>
  {
     return this.http.get<Product[]>(this.baseApi+'Products/productsByCommercialStoreId/'+commercialStoreId).pipe(
                               catchError(this.handleError.handleError))
  }

}
