import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from '../models/vehicle';

@Component({
  selector: 'app-update-vehicle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-vehicle.html',
  styleUrls: ['./update-vehicle.css']
})
export class UpdateVehicle implements OnInit {

  vehicle: Vehicle = new Vehicle();
  successMessage = '';
  errorMessage = '';
  vehicleId!: number;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // get id from URL
    this.vehicleId = Number(this.route.snapshot.paramMap.get('id'));

    //  fetch existing vehicle data
    this.http.get<Vehicle>(`http://localhost:5000/api/vehicle/${this.vehicleId}`)
      .subscribe({
        next: (res) => {
          this.vehicle = res;
        },
        error: () => {
          this.errorMessage = 'Failed to load vehicle';
        }
      });
  }

  updateVehicle() {
    this.successMessage = '';
    this.errorMessage = '';

    this.http.put(`http://localhost:5000/api/vehicle/${this.vehicleId}`, this.vehicle)
      .subscribe({
        next: () => {
          this.successMessage = 'Vehicle updated successfully';

          setTimeout(() => {
            this.router.navigate(['/user/main']);
          }, 1000);
        },
        error: () => {
          this.errorMessage = 'Failed to update vehicle. Please try again.';
        }
      });
  }
}
