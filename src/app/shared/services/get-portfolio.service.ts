import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponseAll, PortfolioAll } from '../interfaces/portfolio-all';
import {  ApiResponseById, PortfolioById } from '../interfaces/portfolio-by-id';

@Injectable({
  providedIn: 'root'
})
export class GetPortfolioService {

  constructor(private http:HttpClient) { }

  getAllPortfolio():Observable<ApiResponseAll<PortfolioAll[]>>{
    return this.http.get<ApiResponseAll<PortfolioAll[]>>(environment.apiUrl + environment.apiBranchUrl.getAllPortfolio)
  }

  getPortfolioById(id:string):Observable<ApiResponseById<PortfolioById>> {
    return this.http.get<ApiResponseById<PortfolioById>>(environment.apiUrl + environment.apiBranchUrl.getPortfolioById + id)
  }
  
}
