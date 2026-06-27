import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { AuthService } from '../user/services/auth';

@Component({
  selector: 'app-main',
  imports: [FormsModule,Navbar],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {}
