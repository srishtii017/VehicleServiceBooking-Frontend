import { Component, inject } from '@angular/core';
import { ServiceCenterService } from '../Services/service-center-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ServiceCenterDTO } from '../Models/service-center-dto';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-service-center',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-service-center.html',
  styleUrl: './add-service-center.css',
})
export class AddServiceCenter {
  center: ServiceCenterDTO = new ServiceCenterDTO();
  isLoading = false;

  private centerService = inject(ServiceCenterService);
  private toastr = inject(ToastrService);

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.centerService.AddServiceCenter(this.center).subscribe({
      next: (res) => {
        this.isLoading = false;

        this.toastr.success('Service Center added successfully!', 'Success', {
          timeOut: 2500,
          progressBar: true,
          closeButton: true
        });

        this.center = new ServiceCenterDTO();
        form.resetForm(); // Form validation states clear karne ke liye
      },
      error: (err) => {
        this.isLoading = false;
        const msg = err.error?.message || 'Failed to add service center.';

        this.toastr.error(msg, 'Error', {
          timeOut: 4000,
          progressBar: true,
          closeButton: true
        });
      }
    });
  }
}