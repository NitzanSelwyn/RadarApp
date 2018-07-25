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
  author = '';
  authorID = '';

  ngOnInit() {
    //gets data from db by event ID
    let id = this.route.snapshot.params.id;
    this.apiService.getEventsDetails(id).subscribe(data => {
      this.newEvent = data;
      this.authorID = data.author;

      //get the username of the author by his ID
      this.apiService.getUserByID(data.author).subscribe(userName => this.author = userName);


    });


  }

  RegisterToEvent() {
    //register to the event
    const authorID = this.apiService.toekn;
    const eventID = this.route.snapshot.params.id;

    this.apiService.registerToEvent({ authorID: authorID, eventID: eventID })

  }


}
