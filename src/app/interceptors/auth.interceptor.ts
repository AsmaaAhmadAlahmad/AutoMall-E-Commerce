import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../accounts/services/auth.service';
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  var token = authService.getToken();
  var newReq = req.clone({setHeaders:{'Authorization':'Bearer '+ token}})
  return next(newReq);
};
