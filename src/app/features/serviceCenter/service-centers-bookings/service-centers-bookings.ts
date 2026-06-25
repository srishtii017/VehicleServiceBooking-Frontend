import { Component, inject, signal, OnInit } from '@angular/core';
import { ServiceCenterService } from '../Services/service-center-service';
import { GetBookings } from '../Models/get-bookings';
import { NgClass } from '@angular/common';
import { Bookingservice } from '../../booking/services/bookingservice';
import { BookingTableComponent } from '../booking-table-component/booking-table-component';

@Component({
  selector: 'app-service-centers-bookings',
  imports: [NgClass, BookingTableComponent],
  templateUrl: './service-centers-bookings.html',
  styleUrl: './service-centers-bookings.css',
})
export class ServiceCentersBookings implements OnInit {
  private centerService = inject(ServiceCenterService);
  private bookingService = inject(Bookingservice);

  serviceCenters = this.centerService.getServiceCenters();
  allBookings = signal<any[]>([]);

  ngOnInit() {
    this.centerService.FetchCenters();

    this.bookingService.getAllBookings().subscribe({
      next: (data) => {
        this.allBookings.set(data ?? []);
        console.log("Bookings Data Dynamic: ", data);
      },
      error: (err) => console.error("Error fetching all bookings:", err)
    });
  }

  getBookingsForCenter(centerId: string): any[] {
    return this.allBookings().filter(b => b.serviceCenterId === centerId);
  }

  onTableStatusChange(event: { bookingId: string; newStatus: string }) {
    this.allBookings.update(allBookings => 
      allBookings.map(b => b.bookingId === event.bookingId ? { ...b, status: event.newStatus } : b)
    );
  }
}