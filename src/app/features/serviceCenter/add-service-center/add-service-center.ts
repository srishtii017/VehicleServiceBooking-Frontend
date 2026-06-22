import { Component, inject } from '@angular/core';
import { ServiceCenter } from '../Models/service-center';
import { ServiceCenterService } from '../Services/service-center-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-service-center',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-service-center.html',
  styleUrl: './add-service-center.css',
})
export class AddServiceCenter {
  center: ServiceCenter = new ServiceCenter();
  isLoading = false;
  errorMessage = '';

  private centerService: ServiceCenterService = inject(ServiceCenterService);

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    this.centerService.AddServiceCenter(this.center).subscribe({
      next: (res) => {
        this.isLoading = false;
        alert('Service Center added successfully!');
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Failed to add service center.';
      }
    });
  }
}
