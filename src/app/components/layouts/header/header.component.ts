import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen:boolean = false
  constructor(private router:Router,private authService:AuthService){}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen
  }

  logout():void {
    Swal.fire({
      title: "Sure you wanna to logout?",
      text: "You cannot back once you logged out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, log me out!',
      background: '#18181B',
      color: '#ffffff',
      customClass: { popup: 'border border-zinc-800' }
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
      }
    });
  }
}
