import { Component, OnInit, signal } from '@angular/core';
import { Booking } from '../models/booking';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Vehicles } from '../models/vehicles';
import { Bookingservice } from '../services/bookingservice';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-boking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './createbooking.html',
  styleUrl: './createbooking.css',
})
export class AddBoking implements OnInit {

  booking: Booking = new Booking();
  vehicles = signal<Array<Vehicles>>([]);
  selectedVehicle: any = undefined;
  selectedDate: string = ''; // only date

  constructor(private bookingservice: Bookingservice, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadVehicles();
    const serviceCenterId = this.route.snapshot.paramMap.get('id');

    if (serviceCenterId) {
      this.booking.serviceCenterId = serviceCenterId;
    }
  }

  loadVehicles() {
    this.bookingservice.getUserVehicles().subscribe({
      next: (data) => { this.vehicles.set(data); },
      error: (err) => { alert("Failed to load vehicles: " + err); }
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
      this.selectedDate &&
      this.selectedVehicle &&
      // this.booking.vehicleType?.trim() &&
      this.booking.serviceType
    );
  }

  createBooking() {
    this.bookingservice.createBooking(this.booking).subscribe({
      next: () => {
        alert("Booking created successfully ✅");
        this.resetForm();
      },
      error: (err) => {
        console.error(err);
        alert("Booking failed ❌");
      }
    });
    this.resetForm();
  }

  resetForm() {
    this.booking = new Booking();
    // this.booking.serviceCenterId = 
    this.selectedVehicle = undefined;
    this.selectedDate = '';
  }
}