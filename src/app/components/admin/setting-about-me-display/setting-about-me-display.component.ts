import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetSettingService } from '../../../shared/services/get-setting.service';
import { ApiResponseSettingAboutMe, SettingAboutMe } from '../../../shared/interfaces/setting-about-me';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Loading setting about me...',
      background: '#18181B',
      color: '#ffffff',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    this.getSettingService.getSettingAboutMe().subscribe({
      next:(res:ApiResponseSettingAboutMe<SettingAboutMe>) => {
        Swal.close()
        this.settingAboutMeData = res.data
        console.log(this.settingAboutMeData)
      },
      error:(error:any)=> {
        Swal.close()
        console.error("Error getting setting about me: ",error)
      }
    })
  }

  onEditSettingAboutMe(): void {
    this.router.navigateByUrl("/admin/setting-about-me-edit")
  }
  
}
