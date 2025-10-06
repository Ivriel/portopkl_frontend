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
import { ProjectDisplayComponent } from './components/admin/project-display/project-display.component';
import { ProjectDetailComponent } from './components/admin/project-detail/project-detail.component';
import { ChangePasswordComponent } from './components/admin/change-password/change-password.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';

export const routes: Routes = [
    { // route buat pengunjung (public)
        path:'',
        pathMatch:'full',
        component:VisitorParentComponent,
        title:'Porto PKL - Ivriel'
    },
    {
        path:'portfolio/:id',
        component:PortfolioDetailComponent
    },

    // admin route tanpa navbar buat auth aja
   {
    path:'admin',
    component:AuthLayoutComponent,
    children:[
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
        }
    ]
   },

   // admin protected route + navbar
   {
        path:'admin',
        component:AdminLayoutComponent,
        canActivate:[protectedRouteGuard],
        children:[
            {
                path:'dashboard',
                component:DashboardComponent,
                title:'Admin - Dashboard'
            },
            {
                path:'profile',
                component:ProfileComponent,
                title:'Admin - Profile'
            },
            {
                path:'profile-form',
                component:ProfileFormComponent,
                title:'Admin - Edit Profile'
            },
            {
                path:'project-form/:id',
                component:ProjectFormComponent,
                title:'Admin - Project Form'
            },
            {
                path:'project-display',
                component:ProjectDisplayComponent,
                title:'Admin - Project Display'
            },
            {
                path:'project-detail/:id',
                component:ProjectDetailComponent,
            },
            {
                path:'change-password',
                component:ChangePasswordComponent,
                title:'Admin - Change Password'
            }
        ]
   },

    {
        path:'**',
        component:NotfoundComponent,
        title:'404 - Not Found'
    }
];
