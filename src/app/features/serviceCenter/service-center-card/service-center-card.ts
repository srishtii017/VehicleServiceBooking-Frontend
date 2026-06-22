import { Component, inject } from '@angular/core';
import { ServiceCenterService } from '../Services/service-center-service';
import { ServiceCenter } from '../Models/service-center';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-center-card',
  imports: [DatePipe, FormsModule, NgClass],
  templateUrl: './service-center-card.html',
  styleUrl: './service-center-card.css',
})
export class ServiceCenterCard {
  CenterServices: ServiceCenterService = inject(ServiceCenterService);
  serviceCenters: any;

  constructor() {
    this.serviceCenters = this.CenterServices.getServiceCenters();
  }

  ngOnInit() {
    this.CenterServices.FetchCenters();
  }

  viewDetails(center: ServiceCenter) {
    alert(`Viewing details for: ${center.centerName}`);
  }
}
