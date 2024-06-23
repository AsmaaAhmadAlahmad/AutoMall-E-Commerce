import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { HandleErrosServices } from '../../shared/services/handleError.services';
import { RegisterInfo } from '../register/register-info';
import { LoginInfo } from '../login/login-info';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl:any;
  baseApi = 'https://localhost:7137/api/Authentication/';
  constructor(private router: Router,
              private http:HttpClient,
              private handleError:HandleErrosServices) {}


  register(model:RegisterInfo): Observable<any> {
   return this.http.post(this.baseApi+'register',model).pipe(
               catchError(this.handleError.handleError)
    )
  }


  login(model:LoginInfo): Observable<any> {
    return this.http.post(this.baseApi+'login',model).pipe(
                catchError(this.handleError.handleError)
     )
   }

  // جلب  التوكين من اللوكال ستوريج
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // تحقق إذا كان المستخدم مسجل دخول
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // الحصول على دور المستخدم من التوكين
  getUserRoles(): string | null {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded: any  = jwt_decode.jwtDecode(token)
        const roles = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        console.log(roles)
        if (Array.isArray(roles)) {
          return roles.includes('Admin') ? 'Admin' : roles[0];
        }
        return roles;
      }
      return null;
  }

  // تحقق إذا كان المستخدم أدمن
  isAdmin(): boolean {
    const roles = this.getUserRoles();
    return roles ? roles.includes('Admin') : false;
  }

  // تسجيل خروج المستخدم
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
