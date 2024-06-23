import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HandleErrosServices } from '../../../shared/services/handleError.services';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseApi = 'https://localhost:7137/api/Products';
  constructor(private http: HttpClient,
              private handleError:HandleErrosServices) {}

  uploadProduct(productData: FormData): Observable<any> {
    return this.http.post(this.baseApi, productData).pipe(
                       catchError(this.handleError.handleError)
    );
  }
}
