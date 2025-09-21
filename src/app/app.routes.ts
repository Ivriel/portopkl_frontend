import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

export const routes: Routes = [
    {
        path:'admin/login',
        component:LoginComponent
    },
    {
        path:'admin/register',
        component:RegisterComponent
    }
];
