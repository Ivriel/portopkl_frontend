import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const cookieService = inject(CookieService);
  const router = inject(Router);
  
  const token = isPlatformBrowser(platformId) ? cookieService.get("token") : null;

  if(req.url.includes("/auth/login") || req.url.includes("/auth/register") || req.url.includes("/portfolio/getAllPortfolio") || req.url.includes("/portfolio/getPortfolioById") || req.url.includes("/portfolio/getDashboardSummary")) {
    return next(req);
  }

  if (token) {
    const newReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    });
    return next(newReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Clear cookies first
          cookieService.delete('token', '/');
          cookieService.delete('userData', '/');
          
          // Navigate immediately
          router.navigateByUrl('/admin/login');
          
          // Show alert after navigation
          Swal.fire({
            icon: 'error',
            title: 'Session Expired',
            text: 'Your session has expired. Please login again.',
            confirmButtonText: 'OK'
          });
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};
