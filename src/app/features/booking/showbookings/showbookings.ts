import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { GetBookings } from '../models/getbooking';
import { Router, RouterLink } from '@angular/router';
import { Bookingservice } from '../services/bookingservice';
import { ToastrService } from 'ngx-toastr';
import { ServiceCenterService } from '../../serviceCenter/Services/service-center-service';
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

interface BookingWithCenterName extends GetBookings {
  serviceCenterName?: string;
}

@Component({
  selector: 'app-showbookings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './showbookings.html',
  styleUrl: './showbookings.css',
})
export class Showbookings implements OnInit {

  bookings = signal<Array<BookingWithCenterName>>([]);
  bookingToCancel?: BookingWithCenterName;
  showCancelSuccess = false;
  
  private toastr = inject(ToastrService);
  private CenterService = inject(ServiceCenterService);
  private router = inject(Router);

  constructor(private bookingservice: Bookingservice) { }

  ngOnInit(): void {
    this.bookingservice.getMyBookings().pipe(
      switchMap((data) => {
        const sortedBookings = data.sort((a, b) => {
          const dateA = a.createdDate ? new Date(a.createdDate).getTime() : 0;
          const dateB = b.createdDate ? new Date(b.createdDate).getTime() : 0;
          return dateB - dateA;
        });

        if (sortedBookings.length === 0) {
          return of([]);
        }

        const requests = sortedBookings.map((booking) => {
          if (booking.serviceCenterId) {
            return this.CenterService.GetServiceCenterByID(booking.serviceCenterId).pipe(
              switchMap((res: any) => {
                const centerData = res?.data;
                const name = centerData?.name || centerData?.centerName || centerData?.serviceCenterName || 'Unknown Center';
                return of({ ...booking, serviceCenterName: name });
              }),
              catchError(() => {
                return of({ ...booking, serviceCenterName: 'Unknown Center' });
              })
            );
          } else {
            return of({ ...booking, serviceCenterName: 'Not Assigned' });
          }
        });

        return forkJoin(requests);
      })
    ).subscribe({
      next: (enrichedBookings) => {
        this.bookings.set(enrichedBookings);
      },
      error: (error) => {
        console.log("Error fetching bookings:", error);
        this.bookings.set([]);
      }
    });
  }

  goToDetails(bookingId: any) {
    this.router.navigate(['/booking/details', bookingId]);
  }

  goBack(): void {
    window.history.back();
  }

  openCancelPopup(booking: BookingWithCenterName): void {
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
        this.toastr.success('Booking Canceled Successfully', 'success', {
          timeOut: 2100,
          progressBar: true,
          closeButton: true
        });
      },
      error: (error) => {
        console.log("Error cancelling booking:", error);
        this.toastr.error('Failed to cancel booking', 'Error', {
          timeOut: 2100,
          progressBar: true,
          closeButton: true
        });
      }
    });
  }
}