import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../api.service";
import { ActivatedRoute } from "@angular/router";

import { MapsAPILoader } from '@agm/core';
import { } from "@types/googlemaps";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  constructor(private apiService: ApiService, private route: ActivatedRoute, private mapsAPI: MapsAPILoader) { }


  newEvent = {};

  ngOnInit() {
    //gets data from db by event ID
    let id = this.route.snapshot.params.id;
    this.apiService.getEventsDetails(id).subscribe(data => this.newEvent = data)

  }


}
