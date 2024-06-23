import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable, catchError, forkJoin, map, of, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { HandleErrosServices } from "../../shared/services/handleError.services";
import { HttpParams } from '@angular/common/http';


@Injectable({
providedIn: 'root'
})

export class ProdutcsService
{

  // تخزين الجزء الثابت من رابط الاي بي اي في متغير
  // baseApi = 'https://fakestoreapi.com/products';
  baseApi = 'https://localhost:7137/api/';


  constructor(private httpClient: HttpClient,
              private handleErrosServices: HandleErrosServices) {}


  // جلب كل المنتجات
  getAllProducts(pageSize: number, pageNumber: number): Observable<HttpResponse<any>> {
    let params = new HttpParams()
      .append('pageSize', pageSize.toString())
      .append('pageNumber', pageNumber.toString());

    return this.httpClient.get<any>(this.baseApi + 'Products', { params, observe: 'response' })
      .pipe(
        catchError(this.handleErrosServices.handleError))

  }




  // جلب كل التصنيفات
  getAllCategories():  Observable<HttpResponse<any>>
  {
    return this.httpClient.get<any>(this.baseApi+'Categories',{  observe: 'response' }).pipe(
                           catchError(this.handleErrosServices.handleError));
  }

// الدالة التالية هي الدالة التي تدمج ركويست جلب المنتجات مع ركويست جلب التصنيفات
  // Method to fetch all data concurrently using forkJoin
  getAllCategoriesWithAllProducts(pageSize:number, currentPage:number ): Observable<any[]> {
    // Array of observables representing different API calls
      const observables = [
      this.getAllProducts(pageSize,currentPage),
      this.getAllCategories(),
    ];
      // Use forkJoin to make parallel API calls and wait for all responses
      return forkJoin(observables);
  }



// الدالة التالية لفتلرة المنتجات بحسب التصنيف
getProductsByCatogery(keyword:string): Observable<any>
// https://localhost:7137/api/Products/category/3fa85f64-5717-4562-b3fc-2c963f66afa6
{
  return this.httpClient.get(this.baseApi+'Products/byCategory/'+keyword).pipe(
    catchError(this.handleErrosServices.handleError));
}


// الدالة التالية لجلب المنتج بحسب رقم الاي دي
getProductById(id: any): Observable<any>
{
  return this.httpClient.get(this.baseApi+'Products/'+id).pipe(
    catchError(this.handleErrosServices.handleError));

}

}

















