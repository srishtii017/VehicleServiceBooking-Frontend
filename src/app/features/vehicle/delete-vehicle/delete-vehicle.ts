import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Vehicle } from '../models/vehicle';
import { AuthTs } from '../services/auth';

@Component({
  selector: 'app-delete-vehicle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-vehicle.html',
  styleUrls: ['./delete-vehicle.css']
})
export class DeleteVehicle implements OnInit {

  vehicles = signal<Vehicle[]>([]);

  constructor(
    private authService: AuthTs,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserVehicles();
  }


  getUserVehicles() {
    this.authService.getUserVehicles()
      .subscribe({
        next: (res) => {
          console.log("Vehicles:", res);
          this.vehicles.set(res); 
        },
        error: (err) => {
          console.log("Error loading vehicles:", err);
        }
      });
  }

  deleteVehicle(id: number | undefined) {
    if (!id) {
      console.log("Invalid ID:", id); 
      return;
    }

    if (confirm('Delete this vehicle?')) {
      console.log("Deleting ID:", id); 

      this.authService.deleteVehicle(id)
        .subscribe({
          next: () => {
            alert('Deleted successfully');

            // update UI manually using signal
            const updated = this.vehicles().filter(v => v.vehicleId !== id);
            this.vehicles.set(updated);
          },
          error: (err) => {
            console.log("Delete error:", err); // 
            alert('Delete failed. Please try again.');
          }
        });
    }
  }

}