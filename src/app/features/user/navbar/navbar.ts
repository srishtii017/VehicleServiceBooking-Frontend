import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  isLoggedIn = false;
  userName = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // ✅ Subscribe to login state changes
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;

      if (status) {
        const user = this.authService.getUser();
        this.userName = user?.name || '';
      } else {
        this.userName = '';
      }
    });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  goToAbout(): void {
    this.router.navigate(['/about']);
  }

  goToContact(): void {
    this.router.navigate(['/contact']);
  }

  goToProfile(): void {
    this.router.navigate(['/user/profile']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); // ✅ goes to owner/customer page
  }
}