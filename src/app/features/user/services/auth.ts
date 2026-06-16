

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse, User, ApiResponse, RegisterRequest, UpdateUserRequest, ChangePasswordRequest } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private baseUrl = 'http://localhost:5000/user'; //  backend URL

  constructor(private http: HttpClient) {}

  // ── Auth Headers ──
  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // ── Token Helpers ──
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveUser(user: LoginResponse): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): LoginResponse | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // ── API Calls ──

  // POST /api/user/register
  register(data: RegisterRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.baseUrl}/register`, data);
  }

  // POST /api/user/login
  login(data: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.baseUrl}/login`, data);
  }

  // GET /api/user/{id}
  getUserById(id: number): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  // PATCH /api/user/{id}
  updateUser(id: number, data: UpdateUserRequest): Observable<ApiResponse<User>> {
    return this.http.patch<ApiResponse<User>>(`${this.baseUrl}/${id}`, data, {
      headers: this.getHeaders()
    });
  }

  // DELETE /api/user/{id}
  deleteUser(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  // PATCH /api/user/{id}/change-password
  changePassword(id: number, data: ChangePasswordRequest): Observable<ApiResponse<any>> {
    return this.http.patch<ApiResponse<any>>(`${this.baseUrl}/${id}/change-password`, data, {
      headers: this.getHeaders()
    });
  }
}
