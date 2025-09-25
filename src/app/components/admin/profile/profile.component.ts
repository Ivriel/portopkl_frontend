import { Component, OnInit } from '@angular/core';
import { ApiResponseProfile, Profile } from '../../../shared/interfaces/profile';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profile!: Profile;
  constructor(private adminService: AdminService, private title: Title) { }

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile(): void {
    Swal.fire({
      title: 'Memuat data profile...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.adminService.getProfile().subscribe({
      next: (res: ApiResponseProfile<Profile>) => {
        this.profile = res.userData;
        this.title.setTitle(`Profile - ${this.profile.nama}`)
        console.log(this.profile)
      },
      error: (error: any) => {
        console.log("Error fetching profile: ", error)
      },
      complete:()=> {
        Swal.close()
      }
    })
  }

}
