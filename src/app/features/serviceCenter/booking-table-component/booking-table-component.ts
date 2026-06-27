import { Component, input, output, inject, computed } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Bookingservice } from '../../booking/services/bookingservice';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking-table',
  imports: [DatePipe, NgClass],
  templateUrl: './booking-table-component.html',
  styleUrl: './booking-table-component.css'
})
export class BookingTableComponent {
  private router = inject(Router);
  private bookingService = inject(Bookingservice);
  private toastr = inject(ToastrService);

  bookings = input<any[]>([]);
  statusChanged = output<{ bookingId: string; newStatus: string }>();

  private statusPriority: { [key: string]: number } = {
    'Pending': 1,
    'Confirmed': 2,
    'Completed': 3,
    'Cancelled': 4
  };

  sortedBookings = computed(() => {
    const list = [...this.bookings()];
    return list.sort((a, b) => {
      const priorityA = this.statusPriority[a.status] || 99;
      const priorityB = this.statusPriority[b.status] || 99;
      return priorityA - priorityB;
    });
  });

  viewBooking(bookingId: string | undefined) {
    this.router.navigate(['booking/details', bookingId]);
  } 

  onStatusChange(bookingId: string | undefined, event: Event) {
    if (!bookingId) return;

    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value;

    this.bookingService.updateBookingStatus(bookingId, newStatus).subscribe({
      next: () => {
        this.toastr.success(`Status updated to ${newStatus} successfully!`, 'Status Updated', {
          timeOut: 2500,
          progressBar: true,
          closeButton: true
        });

        this.statusChanged.emit({ bookingId, newStatus });
      },
      error: (err) => {
        console.error(err);
        const msg = err.error?.message || 'Failed to update status on the backend!';
        
        this.toastr.error(msg, 'Update Error', {
          timeOut: 4000,
          progressBar: true,
          closeButton: true
        });
      }
    });
  }
}