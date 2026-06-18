import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Vehicle } from '../models/vehicle';

@Component({
  selector: 'app-delete-vehicle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-vehicle.html', 
  styleUrls: ['./delete-vehicle.css']
})
export class DeleteVehicle implements OnInit {

  vehicles: Vehicle[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getVehicles();
  }

  // ✅ LOAD LIST
  getVehicles() {
    this.http.get<Vehicle[]>('http://localhost:5000/api/vehicle')
      .subscribe({
        next: (res) => this.vehicles = res,
        error: () => console.error('Error loading vehicles')
      });
  }

  // ✅ DELETE
  deleteVehicle(id: number | undefined) {
    if (!id) return;

    if (confirm('Delete this vehicle?')) {
      this.http.delete(`http://localhost:5000/api/vehicle/${id}`)
        .subscribe({
          next: () => {
            alert('Deleted successfully');
            this.getVehicles(); 
          },
          error: () => alert('Delete failed. Please try again.')
        });
    }
  }

  // Edit vehicle
  editVehicle(id: number | undefined) {
    if (!id) return;
    this.router.navigate(['/vehicle/update', id]);
  }
}