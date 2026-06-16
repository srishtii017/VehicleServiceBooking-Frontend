import { Routes } from '@angular/router';
import { RoleSelect } from './features/role-select/role-select';
import { Login } from './features/user/login/login';
import { Register } from './features/user/register/register';
import { Profile } from './features/user/profile/profile';
import { ChangePassword } from './features/user/change-password/change-password';
import { LoginOwner } from './features/owner/login-owner/login-owner';
import { RegisterOwner } from './features/owner/register-owner/register-owner';
import { authGuard } from './features/user/guards/auth-guard';

export const routes: Routes = [
  // Role selection — first screen
  { path: '', component: RoleSelect },

  // User routes
  { path: 'user/login', component: Login },
  { path: 'user/register', component: Register },
  { path: 'user/profile', component: Profile, canActivate: [authGuard] },
  { path: 'user/change-password', component: ChangePassword, canActivate: [authGuard] },

  // Owner routes
  { path: 'owner/login', component: LoginOwner },
  { path: 'owner/register', component: RegisterOwner },

  // Unknown → home
  { path: '**', redirectTo: '/' }
];