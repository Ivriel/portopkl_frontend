import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PortfolioAll } from '../interfaces/portfolio-all';
import { PortfolioById } from '../interfaces/portfolio-by-id';

@Injectable({
  providedIn: 'root'
})
export class GetPortfolioService {

  constructor(private http:HttpClient) { }

  getAllPortfolio():Observable<PortfolioAll[]>{
    return this.http.get<PortfolioAll[]>(environment.apiUrl + environment.apiBranchUrl.getAllPortfolio)
  }

  getPortfolioById(id:string):Observable<PortfolioById> {
    return this.http.get<PortfolioById>(environment.apiUrl + environment.apiBranchUrl.getPortfolioById + id)
  }
  
}
