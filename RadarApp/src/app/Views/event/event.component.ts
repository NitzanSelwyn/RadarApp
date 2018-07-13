import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
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

  }

  @ViewChild('search') public searchElemnt: ElementRef;

  ngOnInit() {
    this.mapsAPI.load().then(() => {
      let autoComplete = new google.maps.places.Autocomplete(this.searchElemnt.nativeElement, { types: ["address"] });
      autoComplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autoComplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          else {
            var newLat = place.geometry.location.lat();
            var newLng = place.geometry.location.lng();
            this.lat = newLat;
            this.lng = newLng;
          }
        });
      });
    });



  }

  lat: Number;
  lng: Number;

  eventTitle = '';
  eventDescription = '';
  eventDate: Date;
  eventTime: Time;


  disabled: boolean = true;
  changedEvent(event) {
    if (event.target.checked) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  createEvent() {
    this.apiService.createEvents({
      title: this.eventTitle, description: this.eventDescription,
      time: this.eventTime, date: this.eventDate,
      location: { lat: this.lat, lng: this.lng },
    });
  }

}



