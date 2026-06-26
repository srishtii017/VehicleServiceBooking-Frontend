import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth';
import { RegisterRequest } from '../models/user';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerData: RegisterRequest = {
    name: '',
    email: '',
    phone: '',

    flatNumber: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',

    password: ''
  };

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  private toastr = inject(ToastrService); // ✅ same as login

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  goToLogin(): void {
    this.router.navigate(['/user/login']);
  }

  onRegister(form: NgForm): void {

    if (form.invalid) {
      Object.values(form.controls).forEach((control: any) => {
        control.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.registerData).subscribe({

      next: (response) => {
        this.isLoading = false;

        if (response.success) {

          // ✅ SUCCESS TOAST
          this.toastr.success(
            'Account created successfully!',
            'Registration Successful',
            {
              timeOut: 2500,
              progressBar: true,
              closeButton: true
            }
          );

          this.successMessage = 'Account created! Redirecting to login...';

          setTimeout(() => {
            this.router.navigate(['/user/login']);
          }, 1500);

        } else {

          // ✅ ERROR TOAST (backend message)
          this.toastr.error(
            response?.message || 'Registration failed',
            'Error',
            {
              timeOut: 2500,
              progressBar: true,
              closeButton: true
            }
          );

          this.errorMessage = response.message;
        }
      },

      error: (err) => {
        this.isLoading = false;

        // ✅ ERROR TOAST (API failure)
        this.toastr.error(
          err?.error?.message || 'Registration failed. Please try again.',
          'Error',
          {
            timeOut: 2500,
            progressBar: true,
            closeButton: true
          }
        );

        this.errorMessage =
          err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}