import { Component, OnInit ,signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { GetBookings } from '../models/getbooking';
import { RouterLink } from '@angular/router';
import { Bookingservice } from '../services/bookingservice';

@Component({
  selector: 'app-showbookings',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './showbookings.html',
  styleUrl: './showbookings.css',
})
export class Showbookings implements OnInit{
  
   bookings = signal<Array<GetBookings>>([]);
   bookingToCancel?: GetBookings;
   showCancelSuccess = false;

  constructor(private bookingservice: Bookingservice) {}

  ngOnInit(): void {
    this.bookingservice.getMyBookings().subscribe({
      next: (data) => {
        this.bookings.set(data);
      },
      error: (error) => {
        console.log("Error fetching bookings:", error);
        this.bookings.set([]);
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

    this.bookingservice.cancelBooking(bookingId).subscribe({
       next: () => {
        this.bookings.update((oldBookings) =>
          oldBookings.map((booking) =>
            booking.bookingId === bookingId
              ? { ...booking, status: 'Cancelled' }
              : booking
          )
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
