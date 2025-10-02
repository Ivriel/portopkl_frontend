import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponsePortfolioAll, PortfolioAll } from '../interfaces/portfolio-all';
import {  ApiResponsePortfolioById, PortfolioById } from '../interfaces/portfolio-by-id';

@Injectable({
  providedIn: 'root'
})
export class GetPortfolioService {

  constructor(private http:HttpClient) { }

  getAllPortfolio():Observable<ApiResponsePortfolioAll<PortfolioAll[]>>{
    return this.http.get<ApiResponsePortfolioAll<PortfolioAll[]>>(environment.apiUrl + environment.apiBranchUrl.getAllPortfolio)
  }

  getPortfolioById(id:string):Observable<ApiResponsePortfolioById<PortfolioById>> {
    return this.http.get<ApiResponsePortfolioById<PortfolioById>>(environment.apiUrl + environment.apiBranchUrl.getPortfolioById + id)
  }
  
}
