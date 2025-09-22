import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const protectedRouteGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  const isLoggedin = localStorage.getItem('token')
  if(isLoggedin) {
    return true
  } else{
    alert("Silahkan login terlebih dahulu")
    router.navigateByUrl("/admin/login")
    return false
  }
  
};
