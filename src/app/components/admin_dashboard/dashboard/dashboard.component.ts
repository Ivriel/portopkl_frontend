import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private authService:AuthService){}

  onLogout(){
    this.authService.logout()
  }
}
