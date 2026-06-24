import { Component, inject, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './features/navbar/navbar';
import { RoleSelect } from './features/role-select/role-select';
import { AuthService } from './features/user/services/auth';
import { OwnerAuthService } from './features/owner/Services/owner-auth.service';
import { Login } from './features/user/login/login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, RoleSelect],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  UserAuth = inject(AuthService);
  OwnerAuth = inject(OwnerAuthService);
  // isLoggedIn:boolean = this.UserAuth.isUserLoggedIn() || this.OwnerAuth.isOwnerLoggedIn();
  ls=localStorage;
  protected readonly title = signal('frontend-main');
}
