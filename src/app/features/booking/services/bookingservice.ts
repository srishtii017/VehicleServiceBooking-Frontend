import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getUserVehicles(): Observable<Array<Vehicles>> {
    return this.client.get<Array<Vehicles>>(this.vehicleUrl);
  }

  createBooking(bookingData: Booking): Observable<any> {
    return this.client.post(`${this.bookingUrl}/CreateBooking`, bookingData);
  }

  getMyBookings(): Observable<Array<GetBookings>> {
    return this.client.get<Array<GetBookings>>(`${this.bookingUrl}/my-bookings`);
  }

  cancelBooking(bookingId: string): Observable<any> {
    return this.client.delete(`${this.bookingUrl}/cancel-booking/${bookingId}`);
  }

  updateBooking(updatedBooking: UpdatedBooking): Observable<any> {
    return this.client.patch(`${this.bookingUrl}/update-booking`, updatedBooking);
  }

  getAllBookings(): Observable<Array<any>> {
    return this.client.get<Array<any>>(`${this.bookingUrl}/allbookings`);
  }

  updateBookingStatus(bookingId: string, status: string): Observable<any> {
    const body = { bookingId: bookingId, status: status };
    return this.client.patch(`${this.bookingUrl}/update-status`, body);
  }

  getBookingById(id: string): Observable<any> {
    return this.client.get<any>(`${this.bookingUrl}/${id}`);
  }
}