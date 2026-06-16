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
  isOwner = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isOwner = localStorage.getItem('role') === 'owner';
    if (this.isLoggedIn) {
      const user = this.authService.getUser();
      this.userName = user?.name || '';
    }
  }

  goHome(): void { this.router.navigate(['/']); }
  goToProfile(): void { this.router.navigate(['/user/profile']); }
  goToDashboard(): void { this.router.navigate(['/owner/dashboard']); }

  logout(): void {
    this.authService.logout();
    localStorage.removeItem('role');
    this.isLoggedIn = false;
    this.userName = '';
    this.router.navigate(['/']);
  }
}