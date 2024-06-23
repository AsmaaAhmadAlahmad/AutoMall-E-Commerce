import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, forkJoin, map, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { ApiError } from "../models/ApiError";


@Injectable({
providedIn: 'root'
})

export class HandleErrosServices
{
  




  /

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Something went wrong, try again later. Message: ${err.error.message}`;
    } else {
      // Server-side error
      if (err.status === 0) {
        // A network error occurred. This could be because the API is down or network issue.
        errorMessage = 'Network error: Unable to reach the server. Please try again later.';
        console.error('Network error:', err);
      } else {
        const apiError = err.error as ApiError;
        errorMessage = `${apiError.errorMessage || 'An error occurred while processing your request. Please try again later.'}`;
        const errorCode = apiError.errorCode || 'NO_ERROR_CODE';
        console.error(`Server returned HTTP status code: ${err.status}, Error Code: ${errorCode}, Error Message: ${apiError.errorMessage || 'No error message provided'}`);
      }
    }
    return throwError(() => new Error(errorMessage));

  }



}



