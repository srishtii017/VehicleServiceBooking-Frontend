import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-my-vehicles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-vehicles.html',
  styleUrls: ['./my-vehicles.css']
})
export class MyVehicles implements OnInit {

  vehicles: any[] = [];

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const token = localStorage.getItem('UserToken');

    this.http.get<any[]>(
      'http://localhost:5000/vehicle/user-vehicles',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({
      next: (data) => {
        console.log("Vehicles:", data);

        this.vehicles = data;

        // ✅ FORCE UI UPDATE (important fix)
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log("Error fetching vehicles:", err);
      }
    });
  }

  deleteVehicle(id: number) {

    const token = localStorage.getItem('token');

    this.http.delete(
      `http://localhost:5000/vehicle/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({
      next: () => {

        // ✅ remove from UI
        this.vehicles = this.vehicles.filter(v => v.vehicleId !== id);

        alert("Vehicle deleted ✅");
      },
      error: (err) => {
        console.log("Delete error:", err);
        alert("Delete failed ❌");
      }
    });
  }
}
