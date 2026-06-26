import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';   // ✅ IMPORTANT FIX
import { AuthService } from '../services/auth';
import { User, UpdateUserRequest } from '../models/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],  // ✅ ADD THIS
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  user: User | null = null;
  isEditing = false;
  isLoading = false;

  errorMessage = '';
  successMessage = '';

  updateData: UpdateUserRequest = {
    name: '',
    phone: '',
    flatNumber: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
    pincode: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {

    this.isLoading = true;

    const loggedUser = this.authService.getUser();

    if (!loggedUser) {
      this.router.navigate(['/user/login']);
      return;
    }

    this.authService.getUserById(loggedUser.userID).subscribe({
      next: (res) => {
        this.isLoading = false;

        if (res.success && res.data) {
          this.user = res.data;

          this.updateData = {
            name: this.user.name || '',
            phone: this.user.phone || '',
            flatNumber: this.user.flatNumber || '',
            street: this.user.street || '',
            landmark: this.user.landmark || '',
            city: this.user.city || '',
            state: this.user.state || '',
            pincode: this.user.pincode || ''
          };
        } else {
          this.errorMessage = res.message;
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load profile.';
      }
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;

    this.errorMessage = '';
    this.successMessage = '';

    if (!this.isEditing && this.user) {
      this.updateData = {
        name: this.user.name || '',
        phone: this.user.phone || '',
        flatNumber: this.user.flatNumber || '',
        street: this.user.street || '',
        landmark: this.user.landmark || '',
        city: this.user.city || '',
        state: this.user.state || '',
        pincode: this.user.pincode || ''
      };
    }
  }

  onUpdate(): void {

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const loggedUser = this.authService.getUser();
    if (!loggedUser) return;

    this.authService.updateUser(loggedUser.userID, this.updateData).subscribe({
      next: (res) => {
        this.isLoading = false;

        if (res.success) {
          this.user = { ...this.user!, ...this.updateData };

          this.successMessage = '✅ Profile updated successfully!';
          this.isEditing = false;

          setTimeout(() => {
            this.successMessage = '';
          }, 3000);

        } else {
          this.errorMessage = res.message;
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Update failed.';
      }
    });
  }

goToChangePassword(): void {
  this.router.navigate(['/user/change-password']);
}


}