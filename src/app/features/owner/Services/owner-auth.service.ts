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
    return !!localStorage.getItem('OwnerToken');
  }

  getToken(): string | null {
    return localStorage.getItem('OwnerToken');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  loginOwner(token: string) {
    localStorage.setItem('isOwnerLogged','true')
    localStorage.setItem('OwnerToken', token);
    localStorage.setItem('role', 'owner');
    this.isLoggedIn.set(true);
    this.role.set('owner');
  }

  logoutOwner() {
    localStorage.removeItem('OwnerToken');
    localStorage.removeItem('role');
    localStorage.removeItem('isOwnerLogged');
    this.isLoggedIn.set(false);
    this.router.navigate(['']);
  }

  isOwnerLoggedIn(): boolean {
    return this.isLoggedIn();
  }

  isOwnerRole(): boolean {
    return this.role() === 'owner';
  }
}
