import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/admin_dashboard/dashboard/dashboard.component';
import { DisplayVisitorComponent } from './components/display_visitor/display-visitor/display-visitor.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        component:DisplayVisitorComponent
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
                component:LoginComponent
            },
            {
                path:'register',
                component:RegisterComponent
            },
            {
                path:'dashboard',
                component:DashboardComponent
            }
        ]
    }
];
