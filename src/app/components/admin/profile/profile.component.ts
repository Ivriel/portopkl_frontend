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
          color: '#ffffff'
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
    // Step 1: Confirm dengan native browser dialog
    const confirmDelete = confirm(
      'Delete Profile?\n\n' +
      'This action cannot be undone. All your data will be permanently deleted.\n\n' +
      'Are you sure you want to continue?'
    );
    
    if (!confirmDelete) {
      return;
    }
    
    // Step 2: Minta password
    this.promptPasswordVerification();
  }

  promptPasswordVerification(): void {
    const password = prompt('Enter your password to confirm deletion:');
    
    // User klik Cancel
    if (password === null) {
      return;
    }
    
    // Password kosong
    if (!password.trim()) {
      alert('Password is required');
      // Use setTimeout to prevent immediate recursive call that might cause duplicate requests
      setTimeout(() => {
        this.promptPasswordVerification();
      }, 100);
      return;
    }
    
    // Verify password
    this.verifyAndDelete(password);
  }
  
  verifyAndDelete(password: string): void {
    Swal.fire({
      title: 'Verifying password...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    this.adminService.verifyPassword(password).pipe(take(1)).subscribe({
      next: () => {
        // Password verified, proceed to delete
        Swal.update({
          title: 'Deleting profile...',
        });
        
        this.adminService.deleteProfile().subscribe({
          next: () => {
            Swal.close();
            
            // Logout user
            this.authService.logout();
            
            // Show success toast
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
          // Password salah, tanya lagi
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
              setTimeout(() => {
                this.promptPasswordVerification(); // Retry
              }, 100);
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