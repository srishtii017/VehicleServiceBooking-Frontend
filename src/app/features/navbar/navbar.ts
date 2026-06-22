import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
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
  private UserAuth: AuthService = inject(AuthService);
  private OwnerAuth: OwnerAuthService = inject(OwnerAuthService);
  
  Logout() {
    this.UserAuth.logout();
  }
}