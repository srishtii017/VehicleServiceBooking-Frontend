import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Booking {
  vehicleName?: string;
  vehicleNo?: string;
  serviceCenterId: string ='';
  serviceType?: string;
  serviceDate?: string;
}
