import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseSetting, Setting } from '../interfaces/setting';
import { environment } from '../../../environments/environment';
import { ApiResponseSettingAboutMe, SettingAboutMe } from '../interfaces/setting-about-me';

@Injectable({
  providedIn: 'root'
})
export class GetSettingService {

  constructor(private http:HttpClient) { }

    getSetting():Observable<ApiResponseSetting<Setting>> {
    return this.http.get<ApiResponseSetting<Setting>>(environment.apiUrl + environment.apiBranchUrl.getSetting)
  }

    getSettingAboutMe():Observable<ApiResponseSettingAboutMe<SettingAboutMe>> {
    return this.http.get<ApiResponseSettingAboutMe<SettingAboutMe>>(environment.apiUrl + environment.apiBranchUrl.getSettingAboutMe)
  }

}
