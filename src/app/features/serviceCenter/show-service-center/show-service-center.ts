import { Component, inject, signal } from '@angular/core';
import { ServiceCenterService } from '../Services/service-center-service';
import { ActivatedRoute } from '@angular/router';
import { ServiceCenter } from '../Models/service-center';
import { GetBookings } from '../Models/get-bookings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-show-service-center',
  imports:[DatePipe,NgClass],
  templateUrl: './show-service-center.html',
  styleUrl: './show-service-center.css',
})
export class ShowServiceCenter {
  CenterService = inject(ServiceCenterService);
  ac = inject(ActivatedRoute);
  client = inject(HttpClient);

  center = signal<ServiceCenter | null>(null);
  bookings = signal<GetBookings[]>([]);

  token = localStorage.getItem("OwnerToken");
  headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});

  ngOnInit() {
    this.ac.paramMap.subscribe(params => {
      const id = params.get('id')!;
      this.CenterService.GetServiceCenterByID(id).subscribe({
        next: (res) => {
          if (res.status === 'Success' && res.data) {
            this.center.set(res.data);
            this.client.get<GetBookings[]>("http://localhost:5000/Bookings/my-bookings", {headers: this.headers})
              .subscribe({
                next: (data) => {
                  const filtered = (data ?? []).filter(b => b.serviceCenterId === res.data.serviceCenterID);
                  this.bookings.set(filtered);
                },
                error: (err) => console.error("Error fetching bookings:", err)
              });
          }
        }
      });
    });
  }
}
