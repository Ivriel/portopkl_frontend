import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { Router,RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, FloatLabel, PasswordModule, RouterLink,ButtonModule,InputTextModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService:AuthService,private router:Router){}
 registerObj ={
  nama:'',
  email:'',
  password:''
 }

 onRegister(){
  Swal.fire({
    title:'Loading...',
    allowOutsideClick:false,
    didOpen:()=> {
      Swal.showLoading()
    }
  })


  this.authService.register(this.registerObj).subscribe({
    next:()=> {
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
        title: "Berhasil register"
      });

      this.router.navigateByUrl("/admin/login")
    },
    error:(error:any)=> {
      Swal.fire({
        title:'Error',
        text:error?.error.error || 'Terjadi kesalahan saat login',
        icon:'error'
      }),
      console.error(error)
    },
    complete: ()=> {
      Swal.close()
    }
  })
 }
}
