import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OwnerRegister } from '../Models/register';
import { OwnerRegisterService } from '../Services/owner-register-service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-owner',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register-owner.html',
  styleUrl: './register-owner.css',
})
export class RegisterOwner {

  reg: OwnerRegister = new OwnerRegister();
  isLoading = false;

  private router = inject(Router);
  private RegisterService = inject(OwnerRegisterService);
  private toastr = inject(ToastrService);

  goToLogin(): void {
    this.router.navigate(['/owner/login']);
  }

  HandleRegister(form: NgForm) {

  if (form.invalid) {
    form.control.markAllAsTouched();
    return;
  }

  this.isLoading = true;

  this.RegisterService.RegisterOwner(this.reg).subscribe({
    next: () => {
      this.isLoading = false;

      this.toastr.success('Account created successfully!', 'Success', {
        timeOut: 2500,
        progressBar: true,
        closeButton: true
      });

      this.router.navigate(['/owner/login']);
    },
    error: () => {
      setTimeout(() => {
        this.isLoading = false;

        this.toastr.error('Please check your details.', 'Registration Failed', {
          timeOut: 4000,
          progressBar: true,
          closeButton: true
        });
      });
    }
  });
}
}