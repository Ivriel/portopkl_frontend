import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router) { }

  login(obj:any):Observable<any>{
    return this.http.post<any>(environment.apiUrl + environment.apiBranchUrl.login ,obj)
  }

  register(obj:any):Observable<any> {
    return this.http.post<any>(environment.apiUrl + environment.apiBranchUrl.register,obj)
  } 

  isAuthenticated():boolean {
    const token = localStorage.getItem('token')
    if(token) {
      return true
    } else {
      return false
    }
  }


  logout(){
    localStorage.removeItem('token')
    this.router.navigateByUrl("/admin/login")
  }

}
