import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { ApiResponseProfile, Profile } from '../../../shared/interfaces/profile';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-change-password',
  imports: [FormsModule,CommonModule,Skeleton],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit{
  imageAvatar:string | null = null
  isLoadingAvatar:boolean = true;
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword:boolean = false;

  passwordStrength: 'noob' | 'pro' | 'legend' = 'noob'
  hasMinLength:boolean = false;
  hasUpperCase: boolean = false;
  hasLowerCase: boolean = false;
  hasNumber:boolean = false
  hasSpecialChar: boolean = false;
  passwordsMatch:boolean = false;

  constructor(private adminService:AdminService, private authService:AuthService){}

  ngOnInit(): void {
    this.getUserData()
  }

  onPasswordChange():void {
    this.validatePassword()
    this.checkPasswordMatch()
  }

  validatePassword(): void {
    const password = this.newPassword

    this.hasMinLength = password.length >=6;
    this.hasUpperCase = /[A-Z]/.test(password)
    this.hasLowerCase = /[a-z]/.test(password)
    this.hasNumber = /[0-9]/.test(password)
    this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const validCount = [
      this.hasMinLength,
      this.hasUpperCase,
      this.hasLowerCase,
      this.hasNumber,
      this.hasSpecialChar
    ].filter(Boolean).length

    if(validCount <= 2) {
      this.passwordStrength = 'noob'
    } else if(validCount <= 4) {
      this.passwordStrength = 'pro'
    } else {
      this.passwordStrength = 'legend'
    }
  }

  getUserData():void {
    console.log("🔍 Starting getImageAvatar...")
    this.adminService.getProfile().subscribe({
      next:(res:ApiResponseProfile<Profile>) => {
        
        this.isLoadingAvatar = false
        this.imageAvatar = res.userData.avatar
        console.log(" imageAvatar value:", this.imageAvatar)
      },
      error:(error:any)=> {
        this.isLoadingAvatar = false
        console.error("Error fetching user avatar: ",error)
        this.imageAvatar = "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small_2x/default-avatar-photo-placeholder-profile-icon-vector.jpg"
      }
    })
  }

  checkPasswordMatch(): void {
    this.passwordsMatch = this.newPassword === this.confirmPassword && this.confirmPassword !== '';
  }

  getStrengthWidth(): string {
    switch (this.passwordStrength) {
      case 'noob': return '33.33%';
      case 'pro': return '66.66%';
      case 'legend': return '100%';
      default: return '0%';
    }
  }

  
  isFormValid(): boolean {
    return (
      this.currentPassword !== '' &&
      this.newPassword !== '' &&
      this.confirmPassword !== '' &&
      this.passwordsMatch &&
      this.hasMinLength &&
      this.hasUpperCase &&
      this.hasLowerCase &&
      this.hasNumber &&
      this.hasSpecialChar
    );
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    
    if (!this.isFormValid()) {
      Swal.fire({
        title: 'Invalid Form',
        text: 'Please fill all fields correctly and meet all password requirements.',
        icon: 'error',
        background: '#18181B',
        color: '#ffffff',
        confirmButtonColor: '#34D399'
      });
      return;
    }

    Swal.fire({
      title: 'Change Password?',
      text: 'You will be logged out from all devices.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34D399',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'Cancel',
      background: '#18181B',
      color: '#ffffff'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title:'Mengganti Password...',
          background: '#18181B',
          color: '#ffffff',
          allowOutsideClick:false,
          didOpen:()=> {
            Swal.showLoading()
          }
        })

        this.adminService.changePassword({
          currentPassword: this.currentPassword,
          newPassword: this.newPassword
        }).subscribe({
          next: () => {
            Swal.close()
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
              title: "Berhasil mengganti password"
            });
            this.authService.logout()
            this.currentPassword = '';
            this.newPassword = '';
            this.confirmPassword = '';
          },
          error: (err:any) => {
            Swal.close()
            Swal.fire({
              title: 'Failed to change password',
              text: err?.error || 'Please try again.',
              icon: 'error',
              confirmButtonColor: '#34D399',
              background: '#18181B',
              color: '#ffffff'
            });
            console.error("Error changing password: ",err)
          }
        })
      }
    });
  }

  goBack():void {
    window.history.back()
  }


}
