import { Routes } from '@angular/router';
import { RoleSelect } from './features/role-select/role-select';
import { Login } from './features/user/login/login';
import { Register } from './features/user/register/register';
import { Profile } from './features/user/profile/profile';
import { ChangePassword } from './features/user/change-password/change-password';
import { LoginOwner } from './features/owner/login-owner/login-owner';
import { RegisterOwner } from './features/owner/register-owner/register-owner';
import { userGuard,ownerGuard } from './features/guards/auth-guard';
import { Main } from './features/main/main';
import { UpdateVehicle } from './features/vehicle/update-vehicle/update-vehicle';
import { AddVehicle } from './features/vehicle/add-vehicle/add-vehicle';
import { DeleteVehicle } from './features/vehicle/delete-vehicle/delete-vehicle';
import { MyVehicles } from './features/vehicle/my-vehicles/my-vehicles';
import { AddServiceCenter } from './features/serviceCenter/add-service-center/add-service-center';
import { ServiceCenterCard } from './features/serviceCenter/service-center-card/service-center-card';


export const routes: Routes = [
  // Role selection — first screen
  { path: '', component: RoleSelect },
  { path: 'main', component: Main },

  // User routes
  { path: 'user/login', component: Login },
  { path: 'user/register', component: Register },
  {path: 'user/home', component: Main, canActivate: [userGuard] },
  { path: 'user/profile', component: Profile, canActivate: [userGuard] },
  { path: 'user/change-password', component: ChangePassword, canActivate: [userGuard] },

  // Owner routes
  { path: 'owner/login', component: LoginOwner },
  { path: 'owner/register', component: RegisterOwner },

  // Vehicle routes
  { path: 'vehicle/update/:id', component: UpdateVehicle },
  { path: 'add-vehicle', component: AddVehicle, canActivate: [userGuard] },
  { path: 'delete-vehicle', component: DeleteVehicle, canActivate: [userGuard] },
  { path: 'my-vehicles', component: MyVehicles, canActivate: [userGuard] },

  //ServiceCenter Routes
  {path:"servicecenter/addservicecenter",component:AddServiceCenter,canActivate: [ownerGuard]},
  {path:"servicecenter/servicecentercards",component:ServiceCenterCard,canActivate: [ownerGuard]},

  // Unknown → home
  { path: '**', redirectTo: '/' }
];