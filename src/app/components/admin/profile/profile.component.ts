import { Component, OnInit } from '@angular/core';
import { ApiResponseProfile, Profile } from '../../../shared/interfaces/profile';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profile!: Profile;
  
  constructor(
    private adminService: AdminService, 
    private title: Title,
    private router: Router, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile(): void {
    Swal.fire({
      title: 'Memuat data profile...',
      background: '#18181B',
      color: '#ffffff',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.adminService.getProfile().subscribe({
      next: (res: ApiResponseProfile<Profile>) => {
        this.profile = res.userData;
        this.title.setTitle(`Profile - ${this.profile.nama}`)
      },
      error: (error: any) => {
        Swal.close();
        console.error("Error fetching profile: ", error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load profile data',
          icon: 'error',
          confirmButtonColor: '#EF4444',
          background: '#18181B',
          color: '#ffffff',
          customClass: {
            popup: 'border border-zinc-800'
          }
        });
      },
      complete: () => {
        Swal.close()
      }
    })
  }

  goBack(): void {
    window.history.back();
  }
  
  onEditProfile(): void {
    this.router.navigate(['/admin/profile-form']);
  }
  
  onChangePassword(): void {
    this.router.navigate(['/admin/change-password']);
  }


  getSkillCategories(): string[] {
    if (!this.profile.skills || this.profile.skills.length === 0) {
      return [];
    }
    const categories = [...new Set(this.profile.skills.map(skill => skill.category))];
    return categories.filter(cat => cat);
  }
  
  getSkillsByCategory(category: string): any[] {
    if (!this.profile.skills) {
      return [];
    }
    return this.profile.skills.filter(skill => skill.category === category);
  }

  hasSocialMedia(): boolean {
    if (!this.profile.social) {
      return false;
    }
    return !!(
      this.profile.social.github ||
      this.profile.social.linkedin ||
      this.profile.social.facebook ||
      this.profile.social.instagram ||
      this.profile.social.website
    );
  }

  getSocialCount(): number {
    if (!this.profile.social) {
      return 0;
    }
    let count = 0;
    if (this.profile.social.github) count++;
    if (this.profile.social.linkedin) count++;
    if (this.profile.social.facebook) count++;
    if (this.profile.social.instagram) count++;
    if (this.profile.social.website) count++;
    return count;
  }
}