import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth';
import { LoginRequest } from '../models/user';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginData: LoginRequest = {
    email: '',
    password: ''
  };

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  private toastr = inject(ToastrService);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  goToRegister(): void {
    this.router.navigate(['/user/register']);
  }

  // ✅ ONLY FIX: added form parameter
  onLogin(form: NgForm): void {

  if (form.invalid) {
    Object.values(form.controls).forEach((control: any) => {
      control.markAsTouched();
    });
    return;
  }

  this.isLoading = true;
  this.errorMessage = '';
  this.successMessage = '';

  this.authService.login(this.loginData).subscribe({

    next: (response) => {
      this.isLoading = false;

      if (response && response.success === true && response.data && response.data.token) {

        this.authService.saveToken(response.data.token);
        this.authService.saveUser(response.data);

        localStorage.setItem('isUserLogged','true');
        localStorage.setItem('role', 'user');

        this.successMessage = '✅ Login successful! Redirecting...';

        this.toastr.success('Welcome back, ' + response.data.name + '!', 'Login Successful', {
          timeOut: 2500,
          progressBar: true,
          closeButton: true
        });

        setTimeout(() => {
          this.router.navigate(['/main']);
        }, 1500);

      } else {
        this.errorMessage =
          response?.message ||
          'Invalid email or password';
      }
    },

    error: (err) => {
      this.isLoading = false;
      this.toastr.error('Invalid email or password', 'Login Failed', {
        timeOut: 2500,
        progressBar: true,
        closeButton: true
      });
    }
  });
}
}
