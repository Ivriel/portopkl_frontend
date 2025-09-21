import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [FormsModule,InputTextModule,FloatLabel,PasswordModule,ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService:AuthService){}

  loginObj = {
    email:"",
    password:""
  }

  onLogin(){
    this.authService.login(this.loginObj).subscribe({
      next:(response:any)=>{
        alert("Berhasil login")
        console.log(response)
        localStorage.setItem('token',response.token)
      },
      error:(err:any)=> {
        alert("gagal login")
        console.error(err)
      }
    })
  }

}
