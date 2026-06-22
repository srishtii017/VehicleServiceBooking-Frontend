import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './features/navbar/navbar';
import { Main } from './features/main/main';
import { AuthService } from './features/user/services/auth';
import { OwnerAuthService } from './features/owner/Services/owner-auth.service';
import { RoleSelect } from './features/role-select/role-select';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar,RoleSelect],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  UserService:AuthService = inject(AuthService);
  OwnerService:OwnerAuthService = inject(OwnerAuthService);
  ls=localStorage.getItem("token");

  isLoggedIn:boolean = this.UserService.isLoggedIn() || this.OwnerService.isOwnerLoggedIn();
  protected readonly title = signal('frontend-main');


}