import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class AuthTs {

  // Use one consistent API base
  private baseUrl = 'http://localhost:5000/vehicle';

  constructor(private http: HttpClient) {}

  // Common Header (Token)
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  //  GET ALL (user vehicles)
  getUserVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(
      `${this.baseUrl}/user-vehicles`,
      { headers: this.getHeaders() }
    );
  }

  //  GET BY ID
  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(
      `${this.baseUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  //  ADD
  addVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.post(
      `${this.baseUrl}`,
      vehicle,
      { headers: this.getHeaders() }
    );
  }

  //  UPDATE
  updateVehicle(id: number, vehicle: Vehicle): Observable<any> {
  return this.http.patch(
    `${this.baseUrl}/${id}`,   
    vehicle,
    { headers: this.getHeaders() }
  );
}

  // DELETE
  deleteVehicle(id: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }
}