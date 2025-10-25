import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponsePortfolioGallery, PortfolioGallery } from '../../shared/interfaces/portfolio-gallery';
import { environment } from '../../../environments/environment';
import { ApiResponseSettingAboutMe, SettingAboutMe } from '../../shared/interfaces/setting-about-me';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  constructor(private http:HttpClient) { }

  getPortfolioGallery():Observable<ApiResponsePortfolioGallery<PortfolioGallery[]>> {
    return this.http.get<ApiResponsePortfolioGallery<PortfolioGallery[]>>(environment.apiUrl + environment.apiBranchUrl.getGalleryPortfolio)
  }

  getSettingAboutMe():Observable<ApiResponseSettingAboutMe<SettingAboutMe>> {
    return this.http.get<ApiResponseSettingAboutMe<SettingAboutMe>>(environment.apiUrl + environment.apiBranchUrl.getSettingAboutMe)
  }

}
