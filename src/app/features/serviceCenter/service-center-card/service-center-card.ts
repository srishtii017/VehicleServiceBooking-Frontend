import { Component, inject } from '@angular/core';
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

  serviceCenters = this.CenterServices.getServiceCenters();

  ngOnInit() {
    this.CenterServices.FetchCenters();
  }

  viewDetails(center: ServiceCenter) {
    this.router.navigate(['/servicecenter', center.serviceCenterID]);
  }
}