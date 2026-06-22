import { Injectable } from '@angular/core';
import { OwnerRegister } from '../Models/register';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OwnerRegisterService {

  private RegisterUrl = 'http://localhost:5000/owner/register';

  constructor(private client: HttpClient) {}

  RegisterOwner(register: OwnerRegister): Observable<any> {
    return this.client.post(this.RegisterUrl, register);
  }
}
