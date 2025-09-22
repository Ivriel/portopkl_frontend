import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ListPortfolioComponent } from './components/visitor/list-portfolio/list-portfolio.component';
import { loginGuard } from './guards/login.guard';
import { protectedRouteGuard } from './guards/protected-route.guard';
import { PortfolioDetailComponent } from './components/visitor/portfolio-detail/portfolio-detail.component';
import { NotfoundComponent } from './components/fallback/notfound/notfound.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { ProfileFormComponent } from './components/admin/profile-form/profile-form.component';

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
            },
            {
                path:'profile',
                component:ProfileComponent,
                canActivate:[protectedRouteGuard]
            },
            {
                path:'profile-form',
                component:ProfileFormComponent,
                canActivate:[protectedRouteGuard]
            }
        ]
    },
    {
        path:'**',
        component:NotfoundComponent
    }
];
