import { ChangeDetectorRef, inject, Injectable } from '@angular/core';
import { OwnerLogin } from '../Models/login';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OwnerLoginService {
  private LoginUrl = 'http://localhost:5000/owner/login';


  constructor(private client: HttpClient) {}

  LoginOwner(login: OwnerLogin): Observable<any> {
    return this.client.post(this.LoginUrl, login);
  }
}