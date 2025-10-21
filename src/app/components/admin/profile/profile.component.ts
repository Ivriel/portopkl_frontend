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

  onDeleteProfile(): void {
    Swal.fire({
      title: 'Delete Profile?',
      text: "This action cannot be undone. All your data will be permanently deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: '#18181B',
      color: '#ffffff',
      customClass: {
        popup: 'border border-zinc-800'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.promptPasswordVerification();
      }
    });
  }

  promptPasswordVerification(): void {
    Swal.fire({
      title: 'Verify Your Password',
      text: 'Please enter your password to confirm deletion',
      input: 'password',
      inputPlaceholder: 'Enter your password',
      inputAttributes: {
        autocomplete: 'current-password'
      },
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Verify & Delete',
      cancelButtonText: 'Cancel',
      background: '#18181B',
      color: '#ffffff',
      customClass: {
        popup: 'border border-zinc-800'
      },
      inputValidator: (value) => {
        if (!value) {
          return 'Password is required';
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.verifyAndDelete(result.value);
      }
    });
  }
  
  verifyAndDelete(password: string): void {
    Swal.fire({
      title: 'Verifying password...',
      background: '#18181B',
      color: '#ffffff',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    this.adminService.verifyPassword(password).pipe(take(1)).subscribe({
      next: () => {
        Swal.update({
          title: 'Deleting profile...',
        });
        
        this.adminService.deleteProfile().pipe(take(1)).subscribe({
          next: () => {
            Swal.close();
            this.authService.logout();
            
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            
            Toast.fire({
              icon: "success",
              title: "Profile deleted successfully"
            });
          },
          error: (error) => {
            Swal.close();
            console.error("Error deleting profile: ", error);
            
            Swal.fire({
              title: 'Delete Failed',
              text: error.error?.message || 'Failed to delete profile',
              icon: 'error',
              confirmButtonColor: '#EF4444',
              background: '#18181B',
              color: '#ffffff',
              customClass: {
                popup: 'border border-zinc-800'
              }
            });
          }
        });
      },
      error: (error) => {
        Swal.close();
        
        if (error.status === 401 || error.status === 400) {
          Swal.fire({
            title: 'Incorrect Password',
            text: 'The password you entered is incorrect. Try again?',
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Retry',
            cancelButtonText: 'Cancel',
            background: '#18181B',
            color: '#ffffff',
            customClass: {
              popup: 'border border-zinc-800'
            }
          }).then((result) => {
            if (result.isConfirmed) {
              this.promptPasswordVerification();
            }
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'An error occurred while verifying password',
            icon: 'error',
            confirmButtonColor: '#EF4444',
            background: '#18181B',
            color: '#ffffff',
            customClass: {
              popup: 'border border-zinc-800'
            }
          });
        }
      }
    });
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