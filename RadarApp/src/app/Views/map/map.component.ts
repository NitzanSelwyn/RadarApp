import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';

import { MapsAPILoader } from '@agm/core';
import { } from "@types/googlemaps";

//import { } from "@reactivex/rxjs/BehaviorSubject";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private mapsAPI: MapsAPILoader, private ngZone: NgZone) { }


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
        });
      });
    });
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
