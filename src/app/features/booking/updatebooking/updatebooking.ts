import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import{ UpdatedBooking } from '../models/updatebooking';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updatebooking',
  imports: [FormsModule],
  templateUrl: './updatebooking.html',
  styleUrl: './updatebooking.css',
})
export class Updatebooking implements OnInit {
  update:UpdatedBooking=new UpdatedBooking();

  constructor(private client:HttpClient, private route: ActivatedRoute){

  }
  token = localStorage.getItem("UserToken");

  headers = new HttpHeaders({'Authorization': `bearer ${this.token}`});

  ngOnInit(): void {
    const bookingId = this.route.snapshot.queryParamMap.get('bookingId');

    if (bookingId) {
      this.update.bookingId = bookingId;
    }
  }

  updateBooking(){
    if (!this.update.bookingId) {
      alert("Please select a booking from My Bookings first");
      return;
    }

    this.client.patch("http://localhost:5167/api/Bookings/update-booking",this.update,{headers: this.headers}).subscribe({
      next:() => {alert("Booking updated Successfully")},
      error:() => {alert("Booking not found or Duplicate ")}
    });
    console.log(this.update.serviceDate);
    this.update = new UpdatedBooking();
  }
}
