import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-main',
  imports: [FormsModule,Navbar],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

  userName = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('name') || 'User';
  }


}
