import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OwnerLogin } from '../Models/login';
import { OwnerLoginService } from '../Services/owner-login-service';
import { OwnerAuthService } from '../Services/owner-auth.service';

@Component({
  selector: 'app-login-owner',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-owner.html',
  styleUrl: './login-owner.css',
})
export class LoginOwner {
  login: OwnerLogin = new OwnerLogin();
  isLoading = false;
  errorMessage = '';

  private router = inject(Router);
  private loginService = inject(OwnerLoginService);
  private authService = inject(OwnerAuthService);

  goToRegister(): void {
    this.router.navigate(['/owner/register']);
  }

  HandleLogin() {
    this.isLoading = true;
    this.errorMessage = '';

    this.loginService.LoginOwner(this.login).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.authService.loginOwner(res.data);
        this.router.navigate(['/main']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Login failed.';
      }
    });
  }
}
