import { Component, input, output, inject } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Bookingservice } from '../../booking/services/bookingservice';

@Component({
  selector: 'app-booking-table',
  imports: [DatePipe, NgClass],
  templateUrl: './booking-table-component.html',
  styleUrl: './booking-table-component.css'
})
export class BookingTableComponent {
  private router = inject(Router);
  private bookingService = inject(Bookingservice);

  bookings = input<any[]>([]);
  statusChanged = output<{ bookingId: string; newStatus: string }>();

  viewBooking(bookingId: string | undefined) {
    this.router.navigate(['booking/details', bookingId]);
  } 

  onStatusChange(bookingId: string | undefined, event: Event) {
    if (!bookingId) return;

    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value;

    this.bookingService.updateBookingStatus(bookingId, newStatus).subscribe({
      next: () => {
        alert(`Status updated to ${newStatus} successfully!`);
        this.statusChanged.emit({ bookingId, newStatus });
      },
      error: (err) => {
        console.error(err);
        alert("Failed to update status on the backend!");
      }
    });
  }
}