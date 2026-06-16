import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';
import { User, UpdateUserRequest, ChangePasswordRequest } from '../models/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  user: User | null = null;
  isEditing = false;
  isLoading = false;
  isPasswordLoading = false;
  errorMessage = '';
  successMessage = '';
  passwordError = '';
  passwordSuccess = '';

  updateData: UpdateUserRequest = {
    name: '',
    phone: '',
    address: ''
  };

  passwordData: ChangePasswordRequest = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;
    const loggedUser = this.authService.getUser();

    if (!loggedUser) {
      this.isLoading = false;
      this.router.navigate(['/user/login']);
      return;
    }

    this.authService.getUserById(loggedUser.userID).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.data) {
          this.user = response.data;
          this.updateData = {
            name: this.user.name,
            phone: this.user.phone,
            address: this.user.address
          };
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Failed to load profile.';
      }
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    this.errorMessage = '';
    this.successMessage = '';
    this.passwordError = '';
    this.passwordSuccess = '';
  }

  onUpdate(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const loggedUser = this.authService.getUser();

    if (!loggedUser) return;

    this.authService.updateUser(loggedUser.userID, this.updateData).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          // ← update user locally without waiting for reload
          if (this.user) {
            this.user.name = this.updateData.name || this.user.name;
            this.user.phone = this.updateData.phone || this.user.phone;
            this.user.address = this.updateData.address || this.user.address;
          }
          this.successMessage = '✅ Details changed successfully!';
          // auto hide after 3 seconds
          setTimeout(() => this.successMessage = '', 3000);
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Update failed.';
      }
    });
  }

  onChangePassword(): void {
    this.passwordError = '';
    this.passwordSuccess = '';

    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      this.passwordError = 'Passwords do not match.';
      return;
    }

    this.isPasswordLoading = true;
    const loggedUser = this.authService.getUser();
    if (!loggedUser) return;

    this.authService.changePassword(loggedUser.userID, this.passwordData).subscribe({
      next: (response) => {
        this.isPasswordLoading = false;
        if (response.success) {
          this.passwordSuccess = '✅ Password changed successfully! Redirecting to login...';
          setTimeout(() => {
            this.authService.logout();
            this.router.navigate(['/user/login']);
          }, 2000);
        } else {
          this.passwordError = response.message;
        }
      },
      error: (err) => {
        this.isPasswordLoading = false;
        this.passwordError = err.error?.message || 'Failed to change password.';
      }
    });
  }
}