import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HandleErrosServices } from '../../../shared/services/handleError.services';
import { Category } from '../models/category';
import { Guid } from "guid-typescript";

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  // تخزين الجزء الثابت من رابط الاي بي اي في متغير
  // baseApi = 'https://fakestoreapi.com/products';
  baseApi = 'https://localhost:7137/api/Categories/';

  constructor(
    private httpClient: HttpClient,
    private handleErrosServices: HandleErrosServices
  ) {}

  // جلب كل التصنيفات
  getAllCategories(): Observable<Category[]> {
    return this.httpClient
      .get<Category[]>(this.baseApi )
      .pipe(catchError(this.handleErrosServices.handleError));
  }

  // اضافة صنف
  addCategory(category: Category):Observable<Category>  {
      return this.httpClient
      .post<Category>(this.baseApi, category)
      .pipe(catchError(this.handleErrosServices.handleError));
  }

  // تعديل صنف
  UpdateCategory(id:Guid, editCategory:any):Observable<any>
  {
    return this.httpClient
     .put(this.baseApi+id,editCategory)
     .pipe(catchError(this.handleErrosServices.handleError));
  }

   // حذف صنف
   deleteCategory(id:Guid):Observable<any>
   {
     return this.httpClient
      .delete(this.baseApi+id)
      .pipe(catchError(this.handleErrosServices.handleError));
   }
}
