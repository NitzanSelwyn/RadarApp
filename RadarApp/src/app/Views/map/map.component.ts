import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ApiService } from "../../api.service";

import { } from "google-distance-matrix";


import { MapsAPILoader } from '@agm/core';
import { } from "@types/googlemaps";

//import { } from "@reactivex/rxjs/BehaviorSubject";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  constructor(private mapsAPI: MapsAPILoader, private ngZone: NgZone, private apiService: ApiService) {
    this.destLat = 55.930;
    this.destLng = -3.118;
    this.getUserLocation();


  }


  @ViewChild('search') public searchElemnt: ElementRef;


  ngOnInit() {

    this.apiService.getEvents();

    var origin = new google.maps.LatLng(this.lat, this.lng);//your corrent position

    var destination = new google.maps.LatLng(this.destLat, this.destLng);//positions from DB


    //calculate Distance using DistanceMatrix
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.WALKING,
        unitSystem: google.maps.UnitSystem.METRIC,
      }, callback);

    console.log('befor search')
    function callback(response, status) {
      if (status == 'OK') {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;


        for (var i = 0; i < origins.length; i++) {
          var results = response.rows[i].elements;
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            var distance = element.distance;
            var duration = element.duration;
            var from = origins[i];
            var to = destinations[j];
            console.log(from + "To: " + to)
            console.log("distance is: " + distance + "  duration is: " + duration)
          }
        }
      }
    }


  }






  destLat: number;
  destLng: number;

  lat: number;
  lng: number;


  startlat: number = 32.109333;
  startlng: number = 34.855499;







  getUserLocation() {
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });

    }
  }


}


interface marker {

  latitude: number;
  longitude: number;
}
