import { Routes } from '@angular/router';
import { RoleSelect } from './features/role-select/role-select';
import { Login } from './features/user/login/login';
import { Register } from './features/user/register/register';
import { Profile } from './features/user/profile/profile';
import { ChangePassword } from './features/user/change-password/change-password';
import { LoginOwner } from './features/owner/login-owner/login-owner';
import { RegisterOwner } from './features/owner/register-owner/register-owner';
import { authGuard } from './features/user/guards/auth-guard';
import { Main } from './features/main/main';
import { UpdateVehicle } from './features/vehicle/update-vehicle/update-vehicle';
import { AddVehicle } from './features/vehicle/add-vehicle/add-vehicle';
import { DeleteVehicle } from './features/vehicle/delete-vehicle/delete-vehicle';
import { MyVehicles } from './features/vehicle/my-vehicles/my-vehicles';


export const routes: Routes = [
  // Role selection — first screen
  { path: '', component: RoleSelect },
  { path: 'main', component: Main },

  // User routes
  { path: 'user/login', component: Login },
  { path: 'user/register', component: Register },
  {path: 'user/home', component: Main, canActivate: [authGuard] },
  { path: 'user/profile', component: Profile, canActivate: [authGuard] },
  { path: 'user/change-password', component: ChangePassword, canActivate: [authGuard] },

  // Owner routes
  { path: 'owner/login', component: LoginOwner },
  { path: 'owner/register', component: RegisterOwner },

  // Vehicle routes
  { path: 'vehicle/update/:id', component: UpdateVehicle },
  { path: 'add-vehicle', component: AddVehicle, canActivate: [authGuard] },
  { path: 'delete-vehicle', component: DeleteVehicle, canActivate: [authGuard] },
  { path: 'my-vehicles', component: MyVehicles, canActivate: [authGuard] },
  

  // Unknown → home
  { path: '**', redirectTo: '/' }
];