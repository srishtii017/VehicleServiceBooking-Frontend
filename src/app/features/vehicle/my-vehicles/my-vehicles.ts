import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Vehicle } from '../models/vehicle';
import { AuthTs } from '../services/auth';

@Component({
  selector: 'app-my-vehicles',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-vehicles.html',
  styleUrls: ['./my-vehicles.css']
})
export class MyVehicles implements OnInit {

  vehicles = signal<Vehicle[]>([]);

  constructor(private authService: AuthTs) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles() {
    this.authService.getUserVehicles().subscribe({
      next: (res) => {
        this.vehicles.set(res);
    
      },
      error: (err) => {
        console.log("Error:", err);
      }
    });
  }

  /* ✅ DELETE VEHICLE */
  deleteVehicle(id: number) {
    if (!id) return;

    if (confirm("Delete this vehicle?")) {
      this.authService.deleteVehicle(id).subscribe({
        next: () => {

          // ✅ UPDATE UI instantly using signal
          this.vehicles.update(list =>
            list.filter(v => v.vehicleId !== id)
          );

        },
        error: (err) => {
          console.log("Delete failed", err);
        }
      });
    }
  }

}
