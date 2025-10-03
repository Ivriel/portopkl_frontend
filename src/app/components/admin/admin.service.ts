import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponseProfile, Profile } from '../../shared/interfaces/profile';
import { ApiResponseDashboardSummary, DashboardSummary } from '../../shared/interfaces/dashboard-summary';
import { PortfolioById,ApiResponsePortfolioById } from '../../shared/interfaces/portfolio-by-id';
import { ApiResponsePortfolioAll, PortfolioAll } from '../../shared/interfaces/portfolio-all';
import { AddPortfolio, apiResponseAddPortfolio } from '../../shared/interfaces/portfolio-add';
import { ChangePassword } from '../../shared/interfaces/change-password';

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

  deleteProfile():Observable<any> {
    return this.http.delete<any>(environment.apiUrl + environment.apiBranchUrl.deleteUser)
  }

  deletePortfolio(id:string):Observable<any> {
    return this.http.delete<any>(environment.apiUrl + environment.apiBranchUrl.deletePortfolio + id)
  }

  addPortfolio(data:AddPortfolio):Observable<apiResponseAddPortfolio<PortfolioById>> {
    return this.http.post<apiResponseAddPortfolio<PortfolioById>>(environment.apiUrl + environment.apiBranchUrl.addPortfolio,data)
  }

  changePassword(data:ChangePassword):Observable<string> {
    return this.http.put(
      environment.apiUrl + environment.apiBranchUrl.changePassword,
      data,
      { responseType: 'text' as 'json' }
    ) as unknown as Observable<string>;
  }
  
}
