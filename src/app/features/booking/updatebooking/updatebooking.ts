import { Component, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import{ UpdatedBooking } from '../models/updatebooking';
import { ActivatedRoute } from '@angular/router';
import { Bookingservice } from '../services/bookingservice';
import { Vehicles } from '../models/vehicles';

@Component({
  selector: 'app-updatebooking',
  imports: [FormsModule],
  templateUrl: './updatebooking.html',
  styleUrl: './updatebooking.css',
})
export class Updatebooking implements OnInit {
  update:UpdatedBooking=new UpdatedBooking();
  vehicles = signal<Array<Vehicles>>([]);
  selectedVehicle:any ='';

  constructor(private route: ActivatedRoute,private bookingservice:Bookingservice) {

  }

  ngOnInit(): void {
    const bookingId = this.route.snapshot.queryParamMap.get('bookingId');
    this.loadVehicles();

    if (bookingId) {
      this.update.bookingId = bookingId;
    }
  }

  loadVehicles(){
    this.bookingservice.getUserVehicles().subscribe({
      next: (data) => {this.vehicles.set(data);
      },
      error:(err) => {alert("Failed to load vehicles: "+err)}
    })
  }

  onVehicleSelect(vehicle: any) {
    if (vehicle) {
      this.update.vehicleNo = vehicle.registrationNumber;
      this.update.vehicleName = vehicle.model;
      this.update.vehicleType = vehicle.type;
    } else {
      this.update.vehicleNo = undefined;
      this.update.vehicleName = undefined;
      this.update.vehicleType = undefined;
    }
  }

  updateBooking(){
    if (!this.update.bookingId) {
      alert("Please select a booking from My Bookings first");
      return;
    }

    this.bookingservice.updateBooking(this.update).subscribe({
      next:() => {alert("Booking updated Successfully")},
      error:() => {alert("Booking not found or Duplicate ")}
    });
    console.log(this.update.serviceDate);
    this.update = new UpdatedBooking();
  }
}
