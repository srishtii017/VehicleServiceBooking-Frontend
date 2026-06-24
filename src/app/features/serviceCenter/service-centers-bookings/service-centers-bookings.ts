import { Component, inject, signal, OnInit } from '@angular/core';
import { ServiceCenterService } from '../Services/service-center-service';
import { ServiceCenter } from '../Models/service-center';
import { GetBookings } from '../Models/get-bookings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-service-centers-bookings',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './service-centers-bookings.html',
  styleUrl: './service-centers-bookings.css',
})
export class ServiceCentersBookings implements OnInit {
  private centerService = inject(ServiceCenterService);
  private client = inject(HttpClient);

  serviceCenters = this.centerService.getServiceCenters();
  allBookings = signal<GetBookings[]>([]);

  ngOnInit() {
    this.centerService.FetchCenters();
    const token = localStorage.getItem("OwnerToken");
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.client.get<GetBookings[]>("http://localhost:5000/Bookings/my-bookings", { headers })
      .subscribe({
        next: (data) => {
          this.allBookings.set(data ?? []);
        },
        error: (err) => console.error("Error fetching all bookings:", err)
      });
  }

  /**
   * Método optimizado para filtrar las reservas pertenecientes a un centro específico
   */
  getBookingsForCenter(centerId: string): GetBookings[] {
    return this.allBookings().filter(b => b.serviceCenterId === centerId);
  }
}