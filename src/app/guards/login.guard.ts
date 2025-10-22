import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../components/auth/auth.service';
import Swal from 'sweetalert2';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if(authService.isAuthenticated()) {
    Swal.fire({
      icon: "error",
      title: "Anda sudah login",
      text: "Kembali ke dashboard...",
      background: '#18181B',
      color: '#ffffff',
      confirmButtonText:"OK"
    }).then(()=> {// pakai then soalnya sweet alert itu asyncronus. jadiharus tunggu tekan ok dulu baru jalan redirect nya. biar logis .
      router.navigateByUrl("/admin/dashboard")
    })
    return false // blok akses ke login page
  }

  return true // allow akses soalnya emang belum login
};
