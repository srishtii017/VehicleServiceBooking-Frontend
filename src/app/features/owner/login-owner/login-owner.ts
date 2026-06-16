import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OwnerLogin } from '../Models/login';

@Component({
  selector: 'app-login-owner',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-owner.html',
  styleUrl: './login-owner.css',
})
export class LoginOwner {

  login: OwnerLogin = {
    Email: '',
    Password: ''
  };

  isLoading = false;
  errorMessage = '';

  constructor(private client: HttpClient, private router: Router) {}

  goToRegister(): void {
    this.router.navigate(['/owner/register']);
  }

  HandleLogin() {
    this.isLoading = true;
    this.errorMessage = '';

    this.client.post('http://localhost:5000/owner/login', this.login)
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          localStorage.setItem('token', res.data);
          localStorage.setItem('role', 'owner');
          this.router.navigate(['/owner/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Login failed.';
        }
      });
  }
}