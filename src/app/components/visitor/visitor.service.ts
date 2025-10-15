import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponsePortfolioGallery, PortfolioGallery } from '../../shared/interfaces/portfolio-gallery';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  constructor(private http:HttpClient) { }

  getPortfolioGallery():Observable<ApiResponsePortfolioGallery<PortfolioGallery[]>> {
    return this.http.get<ApiResponsePortfolioGallery<PortfolioGallery[]>>(environment.apiUrl + environment.apiBranchUrl.getGalleryPortfolio)
  }

}
