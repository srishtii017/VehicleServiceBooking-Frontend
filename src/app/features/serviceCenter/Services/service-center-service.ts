import { Injectable, signal } from '@angular/core';
import { ServiceCenter } from '../Models/service-center';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceCenterDTO } from '../Models/service-center-dto';

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class ServiceCenterService {
  private apiUrl = 'http://localhost:5000/servicecenter';

  private ServiceCenters = signal<Array<ServiceCenter>>([]);

  constructor(private client: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('OwnerToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  FetchCenters(): void {
    const isUserLogged = localStorage.getItem('isUserLogged') === 'true';
    const isOwnerLogged = localStorage.getItem('isOwnerLogged') === 'true';

    let targetUrl = this.apiUrl; 
    let options = {};

    if (isUserLogged) {
      targetUrl = `${this.apiUrl}/get-centers`;
    } else if (isOwnerLogged) {
      targetUrl = this.apiUrl; 
      options = { headers: this.getAuthHeaders() };
    }

    this.client.get<ApiResponse<ServiceCenter[]>>(targetUrl, options)
      .pipe(map(res => res.data))
      .subscribe({
        next: (centers) => this.ServiceCenters.set(centers),
        error: (err) => console.error('Error fetching service centers:', err)
      });
  }

  getServiceCenters() {
    return this.ServiceCenters.asReadonly();
  }

  AddServiceCenter(center: ServiceCenterDTO): Observable<ApiResponse<ServiceCenter>> {
    return this.client.post<ApiResponse<ServiceCenter>>(this.apiUrl, center, { headers: this.getAuthHeaders() });
  }

  GetServiceCenterByID(id: string): Observable<ApiResponse<ServiceCenter>> {
    return this.client.get<ApiResponse<ServiceCenter>>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  GetAllServiceCenters(): Observable<ApiResponse<ServiceCenter[]>> {
    return this.client.get<ApiResponse<ServiceCenter[]>>(`${this.apiUrl}/get-centers`);
  }

  DeleteServiceCenter(id: string): Observable<ApiResponse<string>> {
    return this.client.delete<ApiResponse<string>>(`${this.apiUrl}/${id}`, { 
      headers: this.getAuthHeaders() 
    });
  }
}