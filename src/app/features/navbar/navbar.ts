import { Component, inject, computed } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../user/services/auth';
import { OwnerAuthService } from '../owner/Services/owner-auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private UserAuth = inject(AuthService);
  private OwnerAuth = inject(OwnerAuthService);

  OwnerLoginIn:boolean = this.OwnerAuth.isOwnerLoggedIn();
  UserLoginIn:boolean = this.UserAuth.isUserLoggedIn();
  ls=localStorage;

  Logout() {
    if (this.ls.getItem('isOwnerLogged')==='true') {
      this.OwnerAuth.logoutOwner();
    } else if (this.ls.getItem('isUserLogged')==='true') {
      this.UserAuth.logout();
    }
  }
}
