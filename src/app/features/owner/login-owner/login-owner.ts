import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OwnerLogin } from '../Models/login';
import { OwnerLoginService } from '../Services/owner-login-service';
import { OwnerAuthService } from '../Services/owner-auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login-owner',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-owner.html',
  styleUrl: './login-owner.css',
})
export class LoginOwner {
  login: OwnerLogin = new OwnerLogin();
  isLoading = false;

  private router = inject(Router);
  private loginService = inject(OwnerLoginService);
  private authService = inject(OwnerAuthService);
  private toastr = inject(ToastrService);

  goToRegister(): void {
    this.router.navigate(['/owner/register']);
  }

 HandleLogin(form: NgForm) {

  if (form.invalid) {
    form.control.markAllAsTouched(); 
    return;
  }

  this.isLoading = true;

  this.loginService.LoginOwner(this.login).subscribe({
    next: (res: any) => {
      this.isLoading = false;
      this.authService.loginOwner(res.data);
      
      this.toastr.success('Welcome back, boss!', 'Login Successful', {
        timeOut: 2500,
        progressBar: true,
        closeButton: true
      });

      this.router.navigate(['/main']);
      // console.log(this.authService.isLoggedIn());
    },
    error: (error) => {
      this.isLoading = false;
      const msg = error.error?.message || 'Login failed.';
      
      this.toastr.error(msg, 'Auth Error', {
        timeOut: 4000,
        progressBar: true,
        closeButton: true
      });
    }
  });
}

}