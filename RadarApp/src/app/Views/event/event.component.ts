import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ApiService } from "../../api.service";
import { postModel } from "../../Model/post.model";
import { Time } from '@angular/common';



import { MapsAPILoader } from '@agm/core';
import { } from "@types/googlemaps";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  public model: postModel;

  constructor(private apiService: ApiService, private mapsAPI: MapsAPILoader, private ngZone: NgZone) {
    this.eventAuthor = this.apiService.toekn;
  }

  @ViewChild('search') public searchElemnt: ElementRef;

  ngOnInit() {
    //loades the search location from google
    this.mapsAPI.load().then(() => {
      let autoComplete = new google.maps.places.Autocomplete(this.searchElemnt.nativeElement, { types: ["address"] });
      autoComplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autoComplete.getPlace();

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
            this.address = place.formatted_address;
          }
        });
      });
    });

    // this.form = this.formBuilder.group({
    //   eventTitle: [null, Validators.required],
    //   eventDate: [null, Validators.required],
    //   address: [null, Validators.required],
    //   lat: [null, Validators.required],
    //   lng: [null, Validators.required],
    // });
  }

  address: string

  lat: Number;
  lng: Number;

  eventTitle = '';
  eventDescription = '';
  eventDate: Date;
  eventTime: Time;
  eventAuthor: String;
  minDate = new Date(Date.now());


  addEvent(event: MatDatepickerInputEvent<Date>) {
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

    this.apiService.createEvents({
      title: this.eventTitle, description: this.eventDescription,
      time: this.eventTime, date: this.eventDate,
      location: { lat: this.lat, lng: this.lng },
      address: this.address,
      author: this.eventAuthor,

    });
    // let isValid = this.apiService.createEvents(this.form.value);
    // if (!isValid) {
    //   this.form.setErrors({
    //     invalidSubmit: true;
    //   })
    // }
  }

}



