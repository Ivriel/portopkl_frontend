import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import Swal from 'sweetalert2';
import { Router,RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, InputTextModule, FloatLabel, PasswordModule, ButtonModule, RouterLink],
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
      allowOutsideClick:false,
      didOpen:()=> {
        Swal.showLoading()
      }
    })

    this.authService.login(this.loginObj).subscribe({
      next:(response:any)=>{
        Swal.close()
        this.router.navigateByUrl("/admin/dashboard")
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
          title: "Berhasil login"
        });
        console.log(response)
        localStorage.setItem('token',response.token)
      },
      error:(error:any)=> {
        Swal.close()
        Swal.fire({
          title:'Error',
          text:error?.error || 'Terjadi kesalahan saat login',
          icon:'error'
        })
        console.error(error)
      }
    })
  }

}
