import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Booking {
  customerName?: string;
  vehicleName?: string;
  vehicleNo?: string;
  vehicleType?: string;
  serviceCenterId?: string;
  serviceType?: string;
  serviceDate?: Date;
}
