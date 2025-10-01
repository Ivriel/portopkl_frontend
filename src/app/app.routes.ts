import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { loginGuard } from './guards/login.guard';
import { protectedRouteGuard } from './guards/protected-route.guard';
import { PortfolioDetailComponent } from './components/visitor/portfolio-detail/portfolio-detail.component';
import { NotfoundComponent } from './components/fallback/notfound/notfound.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { ProfileFormComponent } from './components/admin/profile-form/profile-form.component';
import { ProjectFormComponent } from './components/admin/project-form/project-form.component';
import { VisitorParentComponent } from './components/visitor/visitor-parent/visitor-parent.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        component:VisitorParentComponent,
        title:'Porto PKL - Ivriel'
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
            },
            {
                path:'project-form/:id',
                component:ProjectFormComponent,
                canActivate:[protectedRouteGuard]
            }
        ]
    },
    {
        path:'**',
        component:NotfoundComponent
    }
];
