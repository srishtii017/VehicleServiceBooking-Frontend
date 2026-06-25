import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicles } from '../models/vehicles';
import { Booking } from '../models/booking';
import { UpdatedBooking } from '../models/updatebooking';
import { GetBookings } from '../models/getbooking';

@Injectable({
  providedIn: 'root',
})
export class Bookingservice {
  private vehicleUrl = 'http://localhost:5000/Vehicle/user-vehicles';
  private bookingUrl = 'http://localhost:5000/Bookings';

  constructor(private client: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const isUser = localStorage.getItem('isUserLogged') === 'true';
    const token = isUser ? localStorage.getItem('UserToken') : localStorage.getItem('OwnerToken');
    return new HttpHeaders({
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
  }

  getUserVehicles(): Observable<Array<Vehicles>> {
    return this.client.get<Array<Vehicles>>(this.vehicleUrl, { headers: this.getHeaders() });
  }

  createBooking(bookingData: Booking): Observable<any> {
    return this.client.post(`${this.bookingUrl}/CreateBooking`, bookingData, { headers: this.getHeaders() });
  }

  getMyBookings(): Observable<Array<GetBookings>> {
    return this.client.get<Array<GetBookings>>(`${this.bookingUrl}/my-bookings`, { headers: this.getHeaders() });
  }

  cancelBooking(bookingId: string): Observable<any> {
    return this.client.delete(`${this.bookingUrl}/cancel-booking/${bookingId}`, { headers: this.getHeaders() });
  }

  updateBooking(updatedBooking: UpdatedBooking): Observable<any> {
    return this.client.patch(`${this.bookingUrl}/update-booking`, updatedBooking, { headers: this.getHeaders() });
  }

  getAllBookings(): Observable<Array<any>> {
    return this.client.get<Array<any>>(`${this.bookingUrl}/allbookings`, { headers: this.getHeaders() });
  }

  updateBookingStatus(bookingId: string, status: string): Observable<any> {
    const body = { bookingId: bookingId, status: status };
    return this.client.patch(`${this.bookingUrl}/update-status`, body, { headers: this.getHeaders() });
  }
}
