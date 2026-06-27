import { Component, inject, signal, effect } from '@angular/core';
import { ServiceCenterService } from '../Services/service-center-service';
import { ServiceCenter } from '../Models/service-center';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-center-card',
  imports: [DatePipe, FormsModule, NgClass],
  templateUrl: './service-center-card.html',
  styleUrl: './service-center-card.css',
})
export class ServiceCenterCard {
  CenterServices = inject(ServiceCenterService);
  router = inject(Router);

  readonly masterCenters = this.CenterServices.getServiceCenters();
  serviceCenters = signal<Array<ServiceCenter>>([]);
  searchQuery = signal<string>('');

  constructor() {
    effect(() => {
      const query = this.searchQuery().toLowerCase().trim();
      const allCenters = this.masterCenters();

      if (!query) {
        this.serviceCenters.set(allCenters);
      } else {
        const filtered = allCenters.filter(center => {
          return (
            center.centerName?.toLowerCase().includes(query) ||
            center.city?.toLowerCase().includes(query) ||
            center.state?.toLowerCase().includes(query) ||
            center.pincode?.toLowerCase().includes(query) ||
            center.fullAddress?.toLowerCase().includes(query)
          );
        });
        this.serviceCenters.set(filtered);
      }
    });
  }

  ngOnInit() {
    this.CenterServices.FetchCenters();
  }
  
  viewDetails(center: ServiceCenter) {
    this.router.navigate(['/servicecenter', center.serviceCenterID]);
  }
}