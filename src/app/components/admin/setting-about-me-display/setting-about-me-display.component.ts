import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetSettingService } from '../../../shared/services/get-setting.service';
import { ApiResponseSettingAboutMe, SettingAboutMe } from '../../../shared/interfaces/setting-about-me';

@Component({
  selector: 'app-setting-about-me-display',
  imports: [],
  templateUrl: './setting-about-me-display.component.html',
  styleUrl: './setting-about-me-display.component.css'
})
export class SettingAboutMeDisplayComponent implements OnInit{
  settingAboutMeData!:SettingAboutMe
  constructor(private router:Router, private getSettingService:GetSettingService ){}

  ngOnInit(): void {
    this.getSetting()
  }

  getSetting():void {
    this.getSettingService.getSettingAboutMe().subscribe({
      next:(res:ApiResponseSettingAboutMe<SettingAboutMe>) => {
        this.settingAboutMeData = res.data
        console.log(this.settingAboutMeData)
      },
      error:(error:any)=> {
        console.error("Error getting setting about me: ",error)
      }
    })
  }

  onEditSettingAboutMe(): void {
    this.router.navigateByUrl("/admin/setting-about-me-edit")
  }
  
}
