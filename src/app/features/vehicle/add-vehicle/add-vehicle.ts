import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Vehicle } from '../models/vehicle';
import { AuthTs } from '../services/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './add-vehicle.html',
  styleUrls: ['./add-vehicle.css'], 
})
export class AddVehicle {

  vehicle: Vehicle = new Vehicle();
  message: string = '';
  isLoading = false;

  vehicleservice = inject(AuthTs)
  private toastr = inject(ToastrService);

  constructor(
    private http: HttpClient,
    private router: Router 
  ) {}

  addVehicle() {
  this.isLoading = true;
  this.message = '';

  if (!this.vehicle.make || !this.vehicle.model || !this.vehicle.registrationNumber) {
    this.message = 'Please fill all required fields';
    this.isLoading = false;
    return;
  }

  const token = localStorage.getItem('UserToken');

  this.vehicleservice.addVehicle(this.vehicle).subscribe({
    next: (res) => {
      this.isLoading = false;
      
      this.toastr.success('Vehicle added successfully ✅', 'Success', {
          timeOut: 2500,
          progressBar: true,
          closeButton: true 
      });
      

      setTimeout(() => {
        this.router.navigate(['/my-vehicles']);
      }, 1000);
    },

    error: (err) => {
      
      this.isLoading = false;
      this.toastr.error('Vehicle already registered', 'Error', {
          timeOut: 2500,
          progressBar: true,
          closeButton: true
        });
    }
  });

  this.vehicle = new Vehicle();

  }
}
