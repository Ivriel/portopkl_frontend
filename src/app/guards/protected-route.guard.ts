import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../components/auth/auth.service';

export const protectedRouteGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    alert("Silahkan login terlebih dahulu");
    authService.logout();
    return false;
  }
};
