import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Login } from '../../shared/interfaces/login';
import { LoginResponse } from '../../shared/interfaces/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router, private cookieService:CookieService) { }

  login(obj:Login):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(environment.apiUrl + environment.apiBranchUrl.login ,obj)
  }

  setToken(token:string):void {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1); // expire 1 jam kaya dari BE

    this.cookieService.set('token',token,{
      expires:expirationDate,
      path:'/',
      secure:true, // set ke true kalo di production
      sameSite:'Lax'
    })
  }

  getToken():string | null {
    return this.cookieService.get('token') || null;
  }

  isAuthenticated():boolean {
    return this.cookieService.check('token');
  }

  isTokenExpired():boolean {
    return !this.cookieService.check('token')
  }

  logout(){
    this.cookieService.delete('token','/')
    this.router.navigateByUrl("/admin/login")
  }

}
