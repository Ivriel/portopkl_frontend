import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [FormsModule,FloatLabel,PasswordModule],
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
      Swal.close()
      this.router.navigateByUrl("/admin/login")
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
    },
    error:(error:any)=> {
      Swal.close()
      Swal.fire({
        title:'Error',
        text:error?.error || 'Terjadi kesalahan saat login',
        icon:'error'
      }),
      console.error(error)
    }
  })
 }
}
