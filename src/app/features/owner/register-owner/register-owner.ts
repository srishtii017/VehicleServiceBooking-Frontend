import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Register } from '../Models/register';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-owner',
  imports: [RouterLink,FormsModule],
  templateUrl: './register-owner.html',
  styleUrl: './register-owner.css',
})
export class RegisterOwner {
  reg:Register=new Register();

  constructor(private client:HttpClient, private router:Router){}

  public HandleRegister(){
    this.client.post("http://localhost:5000/owner/register",this.reg)
    .subscribe({
      next: (data) =>{
        console.log(data);
        alert("Registration successful!");
        this.router.navigate(['/login']);
      },
      error: (error) =>{
        alert(JSON.stringify(error));
        console.log(error);
      } 
    });
  }
}
