import { Component, inject, signal } from '@angular/core';
import { ServiceCenterService } from '../Services/service-center-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCenter } from '../Models/service-center';
import { GetBookings } from '../Models/get-bookings';
import { DatePipe, NgClass } from '@angular/common';
import { Bookingservice } from '../../booking/services/bookingservice';

@Component({
  selector: 'app-show-service-center',
  imports: [DatePipe, NgClass],
  templateUrl: './show-service-center.html',
  styleUrl: './show-service-center.css',
})
export class ShowServiceCenter {
  CenterService = inject(ServiceCenterService);
  bookingService = inject(Bookingservice);
  ac = inject(ActivatedRoute);
  private router = inject(Router);

  center = signal<ServiceCenter | null>(null);
  bookings = signal<any[]>([]);

  isUser = localStorage.getItem('isUserLogged') === 'true' || !!localStorage.getItem('UserToken');

  ngOnInit() {
    this.ac.paramMap.subscribe(params => {
      const id = params.get('id')!;
      
      this.CenterService.GetServiceCenterByID(id).subscribe({
        next: (res) => {
          if (res.status === 'Success' && res.data) {
            this.center.set(res.data);
            
            this.bookingService.getAllBookings().subscribe({
              next: (data) => {
                const filtered = (data ?? []).filter(b => b.serviceCenterId === res.data.serviceCenterID);
                this.bookings.set(filtered);
              },
              error: (err) => console.error(err)
            });
          }
        }
      });
    });
  }

  viewBooking(bookingId: string | undefined) {
    if (!bookingId) {
      alert("Booking ID is missing!");
      return;
    }
    this.router.navigate(['booking/details', bookingId]);
  }

  onStatusChange(bookingId: string | undefined, event: Event) {
    if (!bookingId) return;

    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value;

    this.bookingService.updateBookingStatus(bookingId, newStatus).subscribe({
      next: (response) => {
        alert(`Status updated to ${newStatus} successfully!`);
        this.bookings.update(allBookings => 
          allBookings.map(b => b.bookingId === bookingId ? { ...b, status: newStatus } : b)
        );
      },
      error: (err) => {
        console.error(err);
        alert("Failed to update status on the backend!");
      }
    });
  }

  bookNow() {
    this.router.navigate(["booking/createbooking", this.center()?.serviceCenterID]);
  }
}