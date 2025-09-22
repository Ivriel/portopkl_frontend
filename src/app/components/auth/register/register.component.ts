import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';

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
  this.authService.register(this.registerObj).subscribe({
    next:(res:any)=> {
      this.router.navigateByUrl("/admin/login")
      alert("Berhasil register")
      console.log(res)
    },
    error:(err:any)=> {
      alert("Gagal register"),
      console.log(err)
    }
  })
 }
}
