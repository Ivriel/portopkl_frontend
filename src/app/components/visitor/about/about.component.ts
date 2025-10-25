import { Component, OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { VisitorService } from '../visitor.service';
import { ApiResponseSettingAboutMe, SettingAboutMe } from '../../../shared/interfaces/setting-about-me';

@Component({
  selector: 'app-about',
  imports: [DividerModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{
  settingAboutMe!:SettingAboutMe;

  constructor(private visitorService:VisitorService ){}
  
  ngOnInit(): void {
    this.getSettingAboutMe()
  }

  getSettingAboutMe():void {
    this.visitorService.getSettingAboutMe().subscribe({
      next:(res:ApiResponseSettingAboutMe<SettingAboutMe>) => {
        this.settingAboutMe = res.data,
        console.log(this.settingAboutMe)
      },
      error:(error:any)=> {
        console.error("Error getting setting about me: ",error)
      }
    })
  }

}
