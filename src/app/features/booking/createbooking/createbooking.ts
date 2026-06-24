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

  selectedDate: string = '';
  selectedTime: string = '';

  constructor(private client: HttpClient) {}

  token = localStorage.getItem("UserToken");
  headers = new HttpHeaders({
    'Authorization': `bearer ${this.token}`
  });

  ngOnInit() {
    this.loadVehicles();
    // this.booking.serviceCenterId = 1; // Default/Autofetched center ID
  }

  loadVehicles(){
    this.client.get<Array<Vehicles>>("http://localhost:5179/api/Vehicle/user-vehicles",{headers : this.headers}).subscribe({
      next:(data) => {this.vehicles = data}
    })
  }

  onVehicleSelect(vehicle: any) {
    console.log("selected vehicle:", vehicle);
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
      const timeStr = this.selectedTime ? `T${this.selectedTime}:00` : 'T00:00:00';
      this.booking.serviceDate = new Date(this.selectedDate + timeStr);
    } else {
      this.booking.serviceDate = undefined;
    }
  }

  getFormattedAppointmentSummary(): string {
    if (!this.selectedDate) {
      return '';
    }
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    try {
      const dateParts = this.selectedDate.split('-');
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1;
      const day = parseInt(dateParts[2], 10);
      
      const dateObj = new Date(year, month, day);
      if (isNaN(dateObj.getTime())) {
        return '';
      }
      const dayName = days[dateObj.getDay()];
      const monthName = months[dateObj.getMonth()];
      const dateNum = dateObj.getDate();
      
      let timeStr = '';
      if (this.selectedTime) {
        const [hours, minutes] = this.selectedTime.split(':');
        const h = parseInt(hours, 10);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const displayHr = h % 12 || 12;
        timeStr = ` at ${displayHr}:${minutes} ${ampm}`;
      }
      
      return `Scheduled on ${dayName}, ${monthName} ${dateNum}, ${year}${timeStr}`;
    } catch (e) {
      return '';
    }
  }

  isFormValid(): boolean {
    return !!(
      this.booking.customerName?.trim() &&
      this.booking.serviceCenterId &&
      this.selectedDate &&
      this.selectedVehicle &&
      this.booking.vehicleType?.trim() &&
      this.booking.serviceType
    );
  }

  createBooking() {
    this.client.post("http://localhost:5167/api/Bookings/CreateBooking", this.booking, { headers: this.headers }).subscribe({
      next: () => {
        alert("Booking created successfully");
        this.resetForm();
      },
      error: () => {
        alert("Duplicate booking: Vehicle already booked on this date");
      }
    });
  }

  resetForm() {
    this.booking = new Booking();
    // this.booking.serviceCenterId = 
    this.selectedVehicle = undefined;
    this.selectedDate = '';
    this.selectedTime = '';
  }
}
