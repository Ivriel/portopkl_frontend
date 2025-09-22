import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("token")

  if(req.url.includes("/auth/login") || req.url.includes("/auth/register") || req.url.includes("/portfolio/getAllPortfolio") || req.url.includes("/portfolio/getPortfolioById")) {
    return next(req);
  }

  const newReq = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  })

  return next(newReq)

};
