import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { GetBookings } from '../models/getbooking';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-showbookings',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './showbookings.html',
  styleUrl: './showbookings.css',
})
export class Showbookings implements OnInit{
  
   bookings:Array<GetBookings> = [];
   bookingToCancel?: GetBookings;
   showCancelSuccess = false;
   token = localStorage.getItem("token");
   headers = new HttpHeaders({'Authorization': `bearer ${this.token}`});

  constructor(private client: HttpClient) {
  }

  ngOnInit(): void {
    this.client.get<Array<GetBookings>>("http://localhost:5167/api/Bookings/my-bookings", {headers: this.headers}).subscribe({
      next: (data) => {
        this.bookings = data ?? [];
      },
      error: (error) => {
        console.log("Error fetching bookings:", error);
        this.bookings = [];
      }
    });
  }

  openCancelPopup(booking: GetBookings): void {
    this.bookingToCancel = booking;
    this.showCancelSuccess = false;
  }

  closeCancelPopup(): void {
    this.bookingToCancel = undefined;
  }

  closeSuccessPopup(): void {
    this.showCancelSuccess = false;
  }

  confirmCancelBooking(): void {
    const bookingId = this.bookingToCancel?.bookingId;

    if (!bookingId) {
      return;
    }

    this.client.delete("http://localhost:5167/api/Bookings/cancel-booking/" + bookingId, {headers: this.headers}).subscribe({
      next: () => {
        this.bookings = this.bookings.map((booking) =>
          booking.bookingId === bookingId
            ? { ...booking, status: 'Cancelled' }
            : booking
        );
        this.bookingToCancel = undefined;
        this.showCancelSuccess = true;
        console.log("Cancel booking with ID:", bookingId);
      },
      error: (error) => {
        console.log("Error cancelling booking:", error);
      }
    });
  }
}
