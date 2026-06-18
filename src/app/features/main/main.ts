import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

  userName = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('name') || 'User';
  }

  addVehicle() {
    this.router.navigate(['/add-vehicle']);
  }

  createBooking() {
    this.router.navigate(['/create-booking']);
  }

  myBookings() {
    this.router.navigate(['/my-bookings']);
  }
  myVehicles() {
  console.log("clicked");   // debug
  this.router.navigate(['/my-vehicles']);
}

}
