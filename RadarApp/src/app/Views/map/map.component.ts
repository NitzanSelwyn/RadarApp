import { Component, OnInit } from '@angular/core';

import { MapsAPILoader } from '@agm/core';

//import { } from "@reactivex/rxjs/BehaviorSubject";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

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
