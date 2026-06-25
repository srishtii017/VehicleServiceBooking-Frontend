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
  bookings = signal<GetBookings[]>([]);

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
                console.log(data);
                const filtered = (data ?? []).filter(b => b.serviceCenterId === res.data.serviceCenterID);
                this.bookings.set(filtered);
                console.log(filtered);
              },
              error: (err) => console.error(err)
            });
          }
        }
      });
    });
  }

  bookNow() {
    this.router.navigate(["booking/createbooking", this.center()?.serviceCenterID]);
  }
}