import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router, private cookieService:CookieService) { }

  login(obj:any):Observable<any>{
    return this.http.post<any>(environment.apiUrl + environment.apiBranchUrl.login ,obj)
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

  setloginUser(user:any):void {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours()+1);

    this.cookieService.set('userData',JSON.stringify(user),{
      expires:expirationDate,
      path:'/',
      secure:false,
      sameSite:'Lax'
    })
  }

  getLoginUser():any {
    const userData = this.cookieService.get('userData')
    return userData ? JSON.parse(userData) : null;
  }

  logout(){
    this.cookieService.delete('token','/')
    this.cookieService.delete('userData','/')
    this.router.navigateByUrl("/admin/login")
  }

}
