import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';
import { ChangePasswordRequest } from '../models/user';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePassword {

  passwordData: ChangePasswordRequest = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  goToProfile(): void {
    this.router.navigate(['/user/profile']);
  }

  onChangePassword(): void {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const loggedUser = this.authService.getUser();
    if (!loggedUser) {
      this.router.navigate(['/user/login']);
      return;
    }

    this.authService.changePassword(loggedUser.userID, this.passwordData).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.successMessage = 'Password changed successfully! Please login again.';
          setTimeout(() => {
            this.authService.logout();
            this.router.navigate(['/user/login']);
          }, 2000);
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Failed to change password.';
      }
    });
  }
}