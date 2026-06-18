import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OwnerRegister } from '../Models/register';

@Component({
  selector: 'app-register-owner',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-owner.html',
  styleUrl: './register-owner.css',
})
export class RegisterOwner {
  reg: OwnerRegister = {
    Name: '',
    Email: '',
    Password: '',
    Phone: ''
  };

  isLoading = false;
  errorMessage = '';

  constructor(private client: HttpClient, private router: Router) {}

  goToLogin(): void {
    this.router.navigate(['/owner/login']);
  }

  HandleRegister() {
    this.isLoading = true;
    this.errorMessage = '';

    this.client.post('http://localhost:5000/owner/register', this.reg)
      .subscribe({
        next: (data) => {
          this.isLoading = false;
          alert('Registration successful!');
          this.router.navigate(['/owner/login']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Registration failed.';
        }
      });
  }
}