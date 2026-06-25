import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Vehicle } from '../models/vehicle';

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

  this.http.post('http://localhost:5000/vehicle', this.vehicle, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).subscribe({
    next: (res) => {
      this.isLoading = false;
      this.message = 'Vehicle added successfully';

      this.vehicle = new Vehicle();

      setTimeout(() => {
        this.router.navigate(['/my-vehicles']);
      }, 1000);
    },

    error: (err) => {
      console.log("ERROR:", err);
      this.isLoading = false;
      this.message = 'Failed to add vehicle ❌';
    }
  });

}
}
