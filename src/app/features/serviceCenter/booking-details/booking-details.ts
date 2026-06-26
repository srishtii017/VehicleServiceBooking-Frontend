import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { Bookingservice } from '../../booking/services/bookingservice';

@Component({
  selector: 'app-booking-details',
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './booking-details.html',
  styleUrl: './booking-details.css'
})
export class BookingDetails {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookingService = inject(Bookingservice);

  booking = signal<any>(null);
  isLoading = signal<boolean>(true);

  ngOnInit() {
    const bookingIdStr = this.route.snapshot.paramMap.get('bookingId');
    if (bookingIdStr) {
      this.fetchBookingDetails(bookingIdStr);
    } else {
      this.isLoading.set(false);
      this.goBack();
    }
  }

  fetchBookingDetails(id: string) {
    this.isLoading.set(true);
    this.bookingService.getBookingById(id).subscribe({
      next: (data) => {
        this.booking.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  goBack() {
    this.router.navigate(['/servicecenter/AllBookings']);
  }
}