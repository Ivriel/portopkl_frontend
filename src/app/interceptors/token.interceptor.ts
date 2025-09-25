import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  
  // Only access localStorage if we're in the browser
  const token = isPlatformBrowser(platformId) ? localStorage.getItem("token") : null;

  if(req.url.includes("/auth/login") || req.url.includes("/auth/register") || req.url.includes("/portfolio/getAllPortfolio") || req.url.includes("/portfolio/getPortfolioById") || req.url.includes("/portfolio/getDashboardSummary")) {
    return next(req);
  }

  // Only add Authorization header if we have a token
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
