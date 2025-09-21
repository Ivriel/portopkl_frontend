import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(obj:any):Observable<any>{
    return this.http.post<any>(environment.apiUrl + 'auth/login',obj)
  }

  register(obj:any):Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'auth/register',obj)
  }

}
