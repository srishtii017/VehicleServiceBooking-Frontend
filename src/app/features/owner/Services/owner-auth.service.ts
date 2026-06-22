import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OwnerAuthService {
  isLoggedIn = signal<boolean>(this.hasToken());
  role = signal<string | null>(this.getRole());

  constructor(private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  loginOwner(token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', 'owner');
    this.isLoggedIn.set(true);
    this.role.set('owner');
  }

  logoutOwner() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.isLoggedIn.set(false);
    this.role.set(null);
    this.router.navigate(['/owner/login']);
  }

  isOwnerLoggedIn(): boolean {
    return this.isLoggedIn();
  }

  isOwnerRole(): boolean {
    return this.role() === 'owner';
  }
}
