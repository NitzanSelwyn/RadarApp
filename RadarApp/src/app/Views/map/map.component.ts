import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ApiService } from "../../api.service";
import { mapstyles } from "./map.style";
import { } from "google-distance-matrix";

import { } from "@types/googlemaps";
import { MapsAPILoader, MapTypeStyle } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  constructor(private mapsAPI: MapsAPILoader, private ngZone: NgZone, private apiService: ApiService, private mapStyles: mapstyles) { }

  ngOnInit() {
    this.getUserLocation();

    this.apiService.getEvents();
  }

  destLat: number;
  destLng: number;

  lat: number;
  lng: number;

  city: any;

  circleSize = 2000;



  //Reverse Geocoding To Find "Human" Address
  reverseGeocoding(lat: number, lng: number) {
    //using the geocoder library from google maps api
    let geocoder = new google.maps.Geocoder();
    //foramting the recived points into a latlng virable
    let latlng = new google.maps.LatLng(lat, lng);
    //the request must contain a veribale of type location
    //and the location is the latlng virable above
    let request = {
      location: latlng
    };
    geocoder.geocode(request, (results, status) => {
      //if the request status was ok
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0] != null) {
          //formating the address to be full address
          this.city = results[0].formatted_address;
        }
      }
    });

  }

  //get your corrent position and also the address
  getUserLocation() {
    if (navigator.geolocation) {
      //getting current latitude & longitude
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        parseFloat(this.lat.toString());
        parseFloat(this.lat.toString());
        //reverseGeocing - turrning the latitude & longitude into a readable address
        this.reverseGeocoding(this.lat, this.lng)
      });
    }
  }

  //event change circle size
  chnageCircleSize($event) {
    this.circleSize = $event.value;
  }

  //formating the label of the slide bar
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  //Calculateing Distance Between you position to a point from DB
  calculate(lat: any, lng: any): boolean {
    //your corrent position
    var origin = new google.maps.LatLng(this.lat, this.lng);
    //positions from DB
    var destination = new google.maps.LatLng(lat, lng);
    //calculating the distance between to your location and locations form DB
    const distance = google.maps.geometry.spherical.computeDistanceBetween(origin, destination);
    //if the distance is smaller then the circle size show the marker
    if (distance < this.circleSize) {
      return true;
    }

  }

}











