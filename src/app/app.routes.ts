import { Routes } from '@angular/router';
import { Login } from './features/user/login/login';
import { Profile } from './features/user/profile/profile';
import { Register } from './features/user/register/register';
import { RegisterOwner } from './features/owner/register-owner/register-owner';
import { LoginOwner } from './features/owner/login-owner/login-owner';


export const routes: Routes = [
    // { path: 'login', component: Login },
    // { path: 'register', component: Register },
    // { path: 'profile', component: Profile },

    // //Default redirect when app starts up
    // { path: '', redirectTo: 'login', pathMatch: 'full' }

    { path: 'register', component: RegisterOwner },
    { path: 'login', component: LoginOwner },
    { path: '', redirectTo: '/register', pathMatch: 'full' }

];