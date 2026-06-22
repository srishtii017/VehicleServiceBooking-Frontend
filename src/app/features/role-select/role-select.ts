import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-select',
  standalone: true,
  imports: [],
  templateUrl: './role-select.html',
  styleUrl: './role-select.css'
})
export class RoleSelect {
  constructor(private router: Router) {}

  goToUser(): void {
    this.router.navigate(['/user/login']);
  } 

  goToOwner(): void {
    this.router.navigate(['/owner/login']);
  }
}