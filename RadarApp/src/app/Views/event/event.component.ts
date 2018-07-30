import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ApiService } from "../../api.service";
import { Time } from '@angular/common';
import { Router } from '@angular/router';

import { JwtHelper } from 'angular2-jwt';

import { MapsAPILoader } from '@agm/core';
import { } from "@types/googlemaps";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {


  constructor(private apiService: ApiService, private mapsAPI: MapsAPILoader, private ngZone: NgZone, private route: Router) {
    //this.eventAuthor = this.apiService.toekn;
  }

  @ViewChild('search') public searchElemnt: ElementRef;

  ngOnInit() {
    //loades the search location from google
    this.mapsAPI.load().then(() => {
      //using the utocompelte library from google api
      let autoComplete = new google.maps.places.Autocomplete(this.searchElemnt.nativeElement, { types: ["address"] });
      autoComplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //setting the place results to the property place
          let place: google.maps.places.PlaceResult = autoComplete.getPlace();

          //if there is any place that autocompetele retun 
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          else {
            //gets the lat & lng of the location
            var newLat = place.geometry.location.lat();
            var newLng = place.geometry.location.lng();
            //saving to a virable to save to DB
            this.lat = newLat;
            this.lng = newLng;
            //saving the full formatted address 
            this.address = place.formatted_address;
          }
        });
      });
    });
  }

  address: string

  lat: Number;
  lng: Number;

  eventTitle = '';
  eventDescription = '';
  eventDate: Date;
  eventTime: Time;
  minDate = new Date(Date.now());


  //picking a date
  addEvent(event: MatDatepickerInputEvent<Date>) {
    //setting the picked date to the eventDate local property
    this.eventDate = event.value;
  }

  disabled: boolean = true;
  changedEvent(event) {
    if (event.target.checked) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }


  //creating an event using apiService
  createEvent() {
    //saving all the recived data from the user into an obect to be sent to the server
    this.apiService.createEvents({
      title: this.eventTitle,
      description: this.eventDescription,
      time: this.eventTime,
      date: this.eventDate,
      location: { lat: this.lat, lng: this.lng },
      address: this.address,
      // sending the author token to be decoded back to user ID in the server
      author: this.apiService.toekn

    });
    //navigating to main page
    this.route.navigateByUrl("/");
  }

}



