import { Component, OnInit } from '@angular/core';
import { Booking } from '../models/booking';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehicles } from '../models/vehicles';

@Component({
  selector: 'app-add-boking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './createbooking.html',
  styleUrl: './createbooking.css',
})
export class AddBoking implements OnInit {

  booking: Booking = new Booking();
  vehicles: Array<Vehicles> = [];
  selectedVehicle: any = undefined;
  selectedDate: string = ''; // only date

  constructor(private client: HttpClient) {}

  token = localStorage.getItem("token");
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  ngOnInit() {
    this.loadVehicles();
    if (!this.booking.serviceCenterId) {
      this.booking.serviceCenterId = 0;
    }
  }

  loadVehicles() {
    this.client.get<Array<Vehicles>>(
      "http://localhost:5179/api/Vehicle/user-vehicles",
      { headers: this.headers }
    ).subscribe({
      next: (data) => { this.vehicles = data; }
    });
  }

  onVehicleSelect(vehicle: any) {
    if (vehicle) {
      this.booking.vehicleNo = vehicle.registrationNumber;
      this.booking.vehicleName = vehicle.model;
    } else {
      this.booking.vehicleNo = undefined;
      this.booking.vehicleName = undefined;
    }
  }

  onDateTimeChange() {
    if (this.selectedDate) {
      this.booking.serviceDate = new Date(this.selectedDate)
        .toISOString()
        .slice(0, 10);
    }
  }

  getFormattedAppointmentSummary(): string {
    if (!this.selectedDate) return '';

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    try {
      const [year, month, day] = this.selectedDate.split('-').map(Number);
      const dateObj = new Date(year, month - 1, day);

      if (isNaN(dateObj.getTime())) return '';

      return `Scheduled on ${days[dateObj.getDay()]}, ${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${year}`;
    } 
    catch {
      return '';
    }
  }

  isFormValid(): boolean {
    return !!(
      this.booking.customerName?.trim() &&
      this.selectedDate &&
      this.selectedVehicle &&
      this.booking.vehicleType?.trim() &&
      this.booking.serviceType
    );
  }

  createBooking() {
    this.client.post(
      "http://localhost:5167/api/Bookings/CreateBooking",
      this.booking,
      { headers: this.headers }
    ).subscribe({
      next: () => {
        alert("Booking created successfully ✅");
        this.resetForm();
      },
      error: (err) => {
        console.error(err);
        alert("Booking failed ❌");
      }
    });
  }

  resetForm() {
    this.booking = new Booking();
    this.booking.serviceCenterId = 0; 
    this.selectedVehicle = undefined;
    this.selectedDate = '';
  }
}