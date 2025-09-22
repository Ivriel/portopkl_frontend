import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseProfile, Profile } from '../interfaces/profile';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetProfileService {

  constructor(private http:HttpClient) { }

  getProfile():Observable<ApiResponseProfile<Profile>>{
    return this.http.get<ApiResponseProfile<Profile>>(environment.apiUrl + environment.apiBranchUrl.getProfile)
  }

}
