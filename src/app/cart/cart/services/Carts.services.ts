import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, forkJoin, map, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { HandleErrosServices } from "../../../shared/services/handleError.services";


@Injectable({
providedIn: 'root'
})

export class CartsServices
{
   // تخزين الجزء الثابت من رابط الاي بي اي في متغير
   baseApi = 'https://localhost:7137/api/Carts';

   constructor(private httpClient: HttpClient,
               private handleErrosServices: HandleErrosServices) {}

// يتم  ارسال الطلب فارغ في الدالة التالية لانه فقط سيتم اضافة سلة بدون الاوردر ايتيمس التي في داخلها
    // اما السطر المعلق الذي بعد السطر التالي فهو كان قبل توقيف اضافة الاوردر ايتيمس للسلة عند اضافتها
    // حيث يتم اضافة الاوردر ايتيمس عند اضافة هذه السلة
    createNewCart()
    {
      return this.httpClient.post(this.baseApi,{}).pipe(
                             catchError(this.handleErrosServices.handleError));
    }
  // createNewCart(model: any)
  // {
  //   return this.httpClient.post(this.baseApi, model).pipe(
  //                          catchError(this.handleErrosServices.handleError));
  // }

}



