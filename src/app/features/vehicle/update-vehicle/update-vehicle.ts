import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from '../models/vehicle';
import { AuthTs } from '../services/auth';

@Component({
  selector: 'app-update-vehicle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-vehicle.html',
  styleUrls: ['./update-vehicle.css']
})
export class UpdateVehicle implements OnInit {

  vehicle: Vehicle = new Vehicle();
  successMessage: string = '';
  errorMessage: string = '';
  vehicleId!: number;

  constructor(
    private authService: AuthTs,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /* ✅ LOAD VEHICLE DATA */
  ngOnInit(): void {

    this.vehicleId = Number(this.route.snapshot.paramMap.get('id'));

    this.authService.getVehicleById(this.vehicleId)
      .subscribe({
        next: (res) => {
          this.vehicle = res;
        },
        error: () => {
          this.errorMessage = 'Failed to load vehicle ';
        }
      });
  }

  /* ✅ UPDATE VEHICLE */
  updateVehicle() {

    this.successMessage = '';
    this.errorMessage = '';

    // ✅ STEP 1: BASIC VALIDATION
    if (
      !this.vehicle.make ||
      !this.vehicle.model ||
      !this.vehicle.year ||
      !this.vehicle.registrationNumber
    ) {
      this.errorMessage = 'Please fill all fields properly';
      return;
    }

    // ✅ STEP 2: YEAR VALIDATION
    if (this.vehicle.year < 2010 || this.vehicle.year > 2099) {
      this.errorMessage = 'Enter a valid year (2010–2099)';
      return;
    }

    // ✅ STEP 3: REGISTRATION VALIDATION
    const regPattern = /^[A-Z]{2}[0-9]{2}[A-Z]{1,3}[0-9]{4}$/;

    if (!regPattern.test(this.vehicle.registrationNumber)) {
      this.errorMessage = 'Invalid registration format (Use: UP80CD2345) ❗';
      return;
    }

    // ✅ STEP 4: API CALL
    this.authService.updateVehicle(this.vehicleId, this.vehicle)
      .subscribe({
        next: () => {
          this.successMessage = 'Vehicle updated successfully ✅';

          // ✅ REDIRECT (FIXED)
          setTimeout(() => {
            this.router.navigate(['/my-vehicles']);
          }, 1000);
        },
        error: () => {
          this.errorMessage = 'Failed to update vehicle';
        }
      });
  }

  /* ✅ AUTO UPPERCASE REGISTRATION */
  onRegChange() {
    if (this.vehicle.registrationNumber) {
      this.vehicle.registrationNumber =
        this.vehicle.registrationNumber.toUpperCase();
    }
  }
}