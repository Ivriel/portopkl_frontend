import { Component, OnInit } from '@angular/core';
import { ApiResponseProfile, Profile } from '../../../shared/interfaces/profile';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
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

  goBack(): void {
    window.history.back();
  }
  
  onEditProfile(): void {
    // Implement navigation ke edit profile page
    console.log('Edit profile clicked');
    // this.router.navigate(['/admin/profile/edit']);
  }
  
  onChangePassword(): void {
    // Implement navigation ke change password page atau buka dialog
    console.log('Change password clicked');
    // this.router.navigate(['/admin/profile/change-password']);
  }
  
  // Helper untuk group skills by category
  getSkillCategories(): string[] {
    if (!this.profile.skills || this.profile.skills.length === 0) {
      return [];
    }
    const categories = [...new Set(this.profile.skills.map(skill => skill.category))];
    return categories.filter(cat => cat); // Remove empty/null categories
  }
  
  getSkillsByCategory(category: string): any[] {
    if (!this.profile.skills) {
      return [];
    }
    return this.profile.skills.filter(skill => skill.category === category);
  }
  
  // Helper untuk check social media
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
  
  // Helper untuk count social links
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