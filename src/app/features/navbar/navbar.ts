import { Component, inject, computed } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../user/services/auth';
import { OwnerAuthService } from '../owner/Services/owner-auth.service';
import { ToastrService } from 'ngx-toastr';

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
  private toastr = inject(ToastrService);

  OwnerLoginIn: boolean = this.OwnerAuth.isOwnerLoggedIn();
  UserLoginIn: boolean = this.UserAuth.isUserLoggedIn();
  ls = localStorage;

  Logout() {
    if (this.ls.getItem('isOwnerLogged') === 'true') {
      this.OwnerAuth.logoutOwner();
    } else if (this.ls.getItem('isUserLogged') === 'true') {
      this.UserAuth.logout();
    }

   this.toastr.info('Logged out successfully!', 'See You Soon!', {
      timeOut: 2000,
      progressBar: true,
      closeButton: true
    });
  }
}