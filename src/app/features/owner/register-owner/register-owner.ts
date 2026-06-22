import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OwnerRegister } from '../Models/register';
import { OwnerRegisterService } from '../Services/owner-register-service';

@Component({
  selector: 'app-register-owner',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-owner.html',
  styleUrl: './register-owner.css',
})
export class RegisterOwner {

  reg: OwnerRegister = new OwnerRegister();
  errorMessage = '';
  isLoading = false;

  private router = inject(Router);
  private RegisterService: OwnerRegisterService = inject(OwnerRegisterService);

  goToLogin(): void {
    this.router.navigate(['/owner/login']);
  }

  HandleRegister() {
    this.isLoading = true;
    this.errorMessage = '';

    this.RegisterService.RegisterOwner(this.reg).subscribe({
      next: () => {
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
