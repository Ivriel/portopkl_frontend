import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponseProfile, Profile } from '../../shared/interfaces/profile';
import { ApiResponseDashboardSummary, DashboardSummary } from '../../shared/interfaces/dashboard-summary';
import { ApiResponsePortfolioById, PortfolioById } from '../../shared/interfaces/portfolioById';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  getDashboardSummary():Observable<ApiResponseDashboardSummary<DashboardSummary>> {
    return this.http.get<ApiResponseDashboardSummary<DashboardSummary>>(environment.apiUrl +environment.apiBranchUrl.getDashboardSummary)
  }

  getProfile():Observable<ApiResponseProfile<Profile>>{
    return this.http.get<ApiResponseProfile<Profile>>(environment.apiUrl + environment.apiBranchUrl.getProfile)
  }

  getPortfolioById(id:string):Observable<ApiResponsePortfolioById<PortfolioById>> {
    return this.http.get<ApiResponsePortfolioById<PortfolioById>>(environment.apiUrl + environment.apiBranchUrl.getPortfolioById + id)
  }
  
}
