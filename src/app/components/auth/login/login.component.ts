import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import Swal from 'sweetalert2';
import { Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, InputTextModule, FloatLabel, PasswordModule, ButtonModule, RouterLink,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService:AuthService, private router:Router){}

  loginObj = {
    email:"",
    password:""
  }

  onLogin(): void{
    Swal.fire({
      title:'Loading...',
      background: '#18181B',
      color: '#ffffff',
      allowOutsideClick:false,
      didOpen:()=> {
        Swal.showLoading()
      }
    })

    this.authService.login(this.loginObj).subscribe({
      next:(response:any)=>{
        this.router.navigateByUrl("/admin/dashboard")
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          background: '#18181B',
          color: '#ffffff',
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          background: '#18181B',
          color: '#ffffff',
          title: "Berhasil login"
        });
        console.log(response)
        this.authService.setToken(response.token);
        this.authService.setloginUser(response.userData);
      },
      error:(error:any)=> {
        Swal.fire({
          title:'Error',
          text:error?.error || 'Terjadi kesalahan saat login',
          icon:'error'
        })
        console.error(error)
      },
      complete:()=> {
        Swal.close()
      }
    })
  }

}
