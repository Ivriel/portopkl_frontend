import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/admin_dashboard/dashboard/dashboard.component';
import { ListPortfolioComponent } from './components/display_visitor/list-portfolio/list-portfolio.component';
import { loginGuard } from './guards/login.guard';
import { protectedRouteGuard } from './guards/protected-route.guard';
import { PortfolioDetailComponent } from './components/display_visitor/portfolio-detail/portfolio-detail.component';
import { NotfoundComponent } from './components/fallback/notfound/notfound.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        component:ListPortfolioComponent,
        title:'Porto PKL - Projects'
    },
    {
        path:'portfolio/:id',
        component:PortfolioDetailComponent
    },
    {
        path:'admin',
        children: [
            {
                path:'',
                redirectTo:'login',
                pathMatch:'full'
            },
            {
                path:'login',
                component:LoginComponent,
                canActivate:[loginGuard],
                title:'Porto PKL - Login'
            },
            {
                path:'register',
                component:RegisterComponent,
                title:'Porto PKL - Register'
            },
            {
                path:'dashboard',
                component:DashboardComponent,
                canActivate:[protectedRouteGuard],
                title:'Porto PKL - Dashboard'
            }
        ]
    },
    {
        path:'**',
        component:NotfoundComponent
    }
];
