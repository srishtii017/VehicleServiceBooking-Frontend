import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicles } from '../models/vehicles';
import { Booking } from '../models/booking';
import { UpdatedBooking } from '../models/updatebooking';

@Injectable({
  providedIn: 'root',
})
export class Bookingservice {
  private vehicleUrl = 'http://localhost:5179/api/Vehicle/user-vehicles';
  private bookingUrl = 'http://localhost:5167/api/Bookings';

  constructor(private client: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('UserToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getUserVehicles(): Observable<Array<Vehicles>> {
    return this.client.get<Array<Vehicles>>(this.vehicleUrl, { headers: this.getHeaders() });
  }

  createBooking(bookingData: Booking): Observable<any> {
    return this.client.post(`${this.bookingUrl}/CreateBooking`, bookingData, { headers: this.getHeaders() });
  }

  getMyBookings() : Observable<Array<Booking>> {
    return this.client.get<Array<Booking>>(`${this.bookingUrl}/my-bookings`, { headers: this.getHeaders() });
  }

  cancelBooking(bookingId: string): Observable<any> {
    return this.client.delete(`${this.bookingUrl}/cancel-booking/${bookingId}`, {headers: this.getHeaders()});
  }

  updateBooking(updatedBooking: UpdatedBooking): Observable<any> {
    return this.client.patch(`${this.bookingUrl}/update-booking`,updatedBooking , {headers : this.getHeaders()});
  }
}
