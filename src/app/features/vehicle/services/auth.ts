import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class AuthTs {

  private baseUrl = 'http://localhost:5000/vehicle';

  constructor(private http: HttpClient) {}

  getUserVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.baseUrl}/user-vehicles`);
  }

  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.baseUrl}/${id}`);
  }

  addVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.post(`${this.baseUrl}`, vehicle);
  }

  updateVehicle(id: number, vehicle: Vehicle): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, vehicle);
  }

  deleteVehicle(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}