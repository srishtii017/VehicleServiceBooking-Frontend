import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Login } from '../Models/login';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-owner',
  imports: [FormsModule,RouterLink],
  templateUrl: './login-owner.html',
  styleUrl: './login-owner.css',
})
export class LoginOwner {
  login: Login = new Login();
  constructor(private client: HttpClient) { }

  public HandleLogin() {
    this.client.post("http://localhost:5000/owner/login", this.login)
      .subscribe({
        next: (res:any) => {
          localStorage.setItem("token", res.data);
          console.log(res);
        },
        error: (error) => {
          console.log(error.error);
        }
      });
  }
}
