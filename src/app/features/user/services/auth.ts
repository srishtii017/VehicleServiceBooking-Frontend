import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  User,
  ApiResponse,
  RegisterRequest,
  UpdateUserRequest,
  ChangePasswordRequest
} from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:5000/user';
  router = inject(Router);
  isLoggedIn = signal<boolean>(this.hasToken());

  constructor(private http: HttpClient) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('UserToken');
  }

  saveToken(token: string): void {
    localStorage.setItem('UserToken', token);
    this.isLoggedIn.set(true);
  }

  getToken(): string | null {
    return localStorage.getItem('UserToken');
  }

  saveUser(user: LoginResponse): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): LoginResponse | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn();
  }

  logout(): void {
    localStorage.removeItem('UserToken');
    localStorage.removeItem('isUserLogged');
    localStorage.removeItem('user');
    this.isLoggedIn.set(false);
    this.router.navigate(['']);
  }

  register(data: RegisterRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.baseUrl}/register`, data);
  }

  login(data: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.baseUrl}/login`, data);
  }

  getUserById(id: number): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.baseUrl}/${id}`);
  }

  updateUser(id: number, data: UpdateUserRequest): Observable<ApiResponse<User>> {
    return this.http.patch<ApiResponse<User>>(`${this.baseUrl}/${id}`, data);
  }

  deleteUser(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/${id}`);
  }

  changePassword(id: number, data: ChangePasswordRequest): Observable<ApiResponse<any>> {
    return this.http.patch<ApiResponse<any>>(`${this.baseUrl}/${id}/change-password`, data);
  }
}