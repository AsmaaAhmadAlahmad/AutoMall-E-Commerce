import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, forkJoin, map, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { HandleErrosServices } from "../../../shared/services/handleError.services";


@Injectable({
providedIn: 'root'
})

export class CommercialStoreService
{
   // تخزين الجزء الثابت من رابط الاي بي اي في متغير
   baseApi = 'https://localhost:7137/api/CommercialStores';

   constructor(private httpClient: HttpClient,
               private handleErrosServices: HandleErrosServices) {}

  addCommercialStore(model: any)
  {
    return this.httpClient.post(this.baseApi, model).pipe(
                           catchError(this.handleErrosServices.handleError));
  }


  getAllCommercialStores()
  {
    return this.httpClient.get(this.baseApi).pipe(
                      catchError(this.handleErrosServices.handleError));
  }

}



