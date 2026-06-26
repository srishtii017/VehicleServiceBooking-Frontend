import { Component, inject, signal, OnInit } from '@angular/core';
import { ServiceCenterService } from '../Services/service-center-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCenter } from '../Models/service-center';
import { DatePipe, NgClass } from '@angular/common';
import { Bookingservice } from '../../booking/services/bookingservice';
import { BookingTableComponent } from '../booking-table-component/booking-table-component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-service-center',
  standalone: true,
  imports: [DatePipe, NgClass, BookingTableComponent],
  templateUrl: './show-service-center.html',
  styleUrl: './show-service-center.css',
})
export class ShowServiceCenter implements OnInit {
  CenterService = inject(ServiceCenterService);
  bookingService = inject(Bookingservice);
  ac = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);

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

            if (!this.isUser) {
              this.bookingService.getAllBookings().subscribe({
                next: (data) => {
                  const filtered = (data ?? []).filter(b => b.serviceCenterId === res.data.serviceCenterID);
                  this.bookings.set(filtered);
                  console.log(filtered)
                },
                error: (err) => console.error(err)
              });
            }
          }
        }
      });
    });
  }

  deleteCenter() {
    const id = this.center()?.serviceCenterID;
    if (!id) return;

    if (confirm('Are you sure you want to delete this service center?')) {
      this.CenterService.DeleteServiceCenter(id).subscribe({
        next: (res) => {
          if (res.status === 'Success') {
            this.toastr.success('Service center deleted successfully!', 'Deleted', {
              timeOut: 2500,
              progressBar: true,
              closeButton: true
            });
            this.router.navigate(['/servicecenter/servicecentercards']);
          } else {
            this.toastr.error(res.message || 'Failed to delete', 'Delete Error', {
              timeOut: 4000,
              progressBar: true,
              closeButton: true
            });
          }
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('A server error occurred. Could not delete.', 'Server Error', {
            timeOut: 4000,
            progressBar: true,
            closeButton: true
          });
        }
      });
    }
  }

  bookNow() {
    this.router.navigate(["booking/createbooking", this.center()?.serviceCenterID]);
  }
}