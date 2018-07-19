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

    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(lat, lng);
    let request = {
      location: latlng
    };
    geocoder.geocode(request, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0] != null) {

          this.city = results[0].formatted_address;
        }
      }
    });

  }

  //get your corrent position and also the address
  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        parseFloat(this.lat.toString());
        parseFloat(this.lat.toString());

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
    var origin = new google.maps.LatLng(this.lat, this.lng);//your corrent position
    // console.log(origin);
    var destination = new google.maps.LatLng(lat, lng);//positions from DB
    //console.log(destination);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(origin, destination);//distance between to locations
    if (distance < this.circleSize) {
      //console.log(distance + " From " + this.city);
      return true;
    }

  }



}








// interface marker {

//   latitude: number;
//   longitude: number;
// }


  //calculate Distance using DistanceMatrix
  // calculate(lat: any, lng: any) {
  //   var service = new google.maps.DistanceMatrixService();
  //   var origin = new google.maps.LatLng(this.lat, this.lng);//your corrent position
  //   var destination = new google.maps.LatLng(lat, lng);//positions from DB


  //   service.getDistanceMatrix(
  //     {
  //       origins: [origin],
  //       destinations: [destination],
  //       travelMode: google.maps.TravelMode.WALKING,
  //       unitSystem: google.maps.UnitSystem.METRIC,
  //     }, callback);

  //   function callback(response, status) {
  //     if (status == 'OK') {
  //       var origins = response.originAddresses;
  //       var destinations = response.destinationAddresses;


  //       for (var i = 0; i < origins.length; i++) {
  //         var results = response.rows[i].elements;
  //         for (var j = 0; j < results.length; j++) {
  //           var element = results[j];
  //           var distance = element.distance;
  //           var duration = element.duration;
  //           // var from = origins[i];
  //           // var to = destinations[j];
  //           // console.log(from + "To: " + to)
  //           if (distance > 2000) {

  //           }
  //           console.log("distance is: " + distance + "  duration is: " + duration)
  //         }
  //       }

  //     }

  //   }
  // }










