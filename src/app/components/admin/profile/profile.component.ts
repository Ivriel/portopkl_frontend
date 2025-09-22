import { Component, OnInit } from '@angular/core';
import { ApiResponseProfile, Profile } from '../../../shared/interfaces/profile';
import { Title } from '@angular/platform-browser';
import { GetProfileService } from '../../../shared/services/get-profile.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profile!:Profile;
constructor(private getProfileService:GetProfileService, private title:Title){}

  ngOnInit(): void {
    this.getProfileService.getProfile().subscribe({
      next:(res:ApiResponseProfile<Profile>) => {
        this.profile = res.userData;
        this.title.setTitle(`Profile - ${this.profile.nama}`)
        console.log(this.profile)
      },
      error:(error:any) => {
        console.log("Error fetching profile: ",error)
      }
    })
  }

}
