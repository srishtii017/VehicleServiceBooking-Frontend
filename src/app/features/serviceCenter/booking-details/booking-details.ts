import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe, NgClass, UpperCasePipe } from '@angular/common';
import { Bookingservice } from '../../booking/services/bookingservice';
import { ServiceCenterService } from '../../serviceCenter/Services/service-center-service';
import { switchMap, of, catchError } from 'rxjs';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [DatePipe, UpperCasePipe,RouterLink,NgClass],
  templateUrl: './booking-details.html',
  styleUrl: './booking-details.css'
})
export class BookingDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookingService = inject(Bookingservice);
  private centerService = inject(ServiceCenterService);

  booking = signal<any>(null);
  isLoading = signal<boolean>(true);
  isUserLogged = localStorage.getItem('isUserLogged') === 'true';

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
    
    this.bookingService.getBookingById(id).pipe(
      switchMap((bookingData: any) => {
        if (bookingData && bookingData.serviceCenterId) {
          return this.centerService.GetServiceCenterByID(bookingData.serviceCenterId).pipe(
            switchMap((centerRes: any) => {
              // Pura center object nikal liya
              const centerData = centerRes?.data || null;
              return of({ ...bookingData, serviceCenterDetails: centerData });
            }),
            catchError(() => {
              return of({ ...bookingData, serviceCenterDetails: null });
            })
          );
        }
        return of({ ...bookingData, serviceCenterDetails: null });
      })
    ).subscribe({
      next: (enrichedBooking) => {
        this.booking.set(enrichedBooking);
        this.isLoading.set(false);
        console.log("Booking Detailed Data:", this.booking());
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