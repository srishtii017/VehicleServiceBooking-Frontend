import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OwnerAuthService {
  isOwnerLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  loginOwner(token: string) {
    localStorage.setItem('token', token);
  }

  logoutOwner() {
    localStorage.removeItem('token');
  }
}
