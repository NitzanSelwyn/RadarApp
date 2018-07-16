import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ApiService } from "../../api.service";

import { } from "google-distance-matrix";

import { } from "@types/googlemaps";
import { MapsAPILoader } from '@agm/core';

//import { } from "@reactivex/rxjs/BehaviorSubject";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  constructor(private mapsAPI: MapsAPILoader, private ngZone: NgZone, private apiService: ApiService) { }

  ngOnInit() {
    this.getUserLocation();

    this.apiService.getEvents();
  }


  destLat: number;
  destLng: number;

  lat: number;
  lng: number;

  // startlat: number = 32.109333;
  // startlng: number = 34.855499;
  // google: any;

  city: any;



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

  getUserLocation() {
    /// locate the user
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
}


// interface marker {

//   latitude: number;
//   longitude: number;
// }




  // calculate() {
  //   var origin = new google.maps.LatLng(this.lat, this.lng);//your corrent position
  //   console.log(origin);
  //   var destination = new google.maps.LatLng(this.destLat, this.destLng);//positions from DB
  //   console.log(destination);
  //   const distance = google.maps.geometry.spherical.computeDistanceBetween(origin, destination);
  //   console.log(distance);
  // }






    //calculate Distance using DistanceMatrix
    // var service = new google.maps.DistanceMatrixService();
    // service.getDistanceMatrix(
    //   {
    //     origins: [origin],
    //     destinations: [destination],
    //     travelMode: google.maps.TravelMode.WALKING,
    //     unitSystem: google.maps.UnitSystem.METRIC,
    //   }, callback);

    // console.log('befor search')
    // function callback(response, status) {
    //   if (status == 'OK') {
    //     var origins = response.originAddresses;
    //     var destinations = response.destinationAddresses;


    //     for (var i = 0; i < origins.length; i++) {
    //       var results = response.rows[i].elements;
    //       for (var j = 0; j < results.length; j++) {
    //         var element = results[j];
    //         var distance = element.distance;
    //         var duration = element.duration;
    //         var from = origins[i];
    //         var to = destinations[j];
    //         console.log(from + "To: " + to)
    //         console.log("distance is: " + distance + "  duration is: " + duration)
    //       }
    //     }
    //   }
    // }

