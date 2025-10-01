import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const cookieService = inject(CookieService)
  
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
    return next(newReq);
  }

  return next(req);
};
