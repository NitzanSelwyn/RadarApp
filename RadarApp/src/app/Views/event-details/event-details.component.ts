import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../api.service";
import { ActivatedRoute } from "@angular/router";

import { MapsAPILoader } from '@agm/core';
import { } from "@types/googlemaps";
import { Jsonp } from '@angular/http';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  constructor(private apiService: ApiService, private route: ActivatedRoute, private mapsAPI: MapsAPILoader) { }


  newEvent = {};
  jsonToPush = {};
  author = '';
  authorID = '';
  authorFcmToken = '';

  ngOnInit() {
    //getting the event ID from the URL
    let id = this.route.snapshot.params.id;
    //gets data from db by event ID
    this.apiService.getEventsDetails(id).subscribe(data => {
      //saving the recuved data to a local property
      this.newEvent = data;
      //saving the author ID that was recived with the event data to a local property
      this.authorID = data.author;

      // get the author fcmToken
      this.apiService.getUserFcmToken(data.author).subscribe(fcmToken => this.authorFcmToken = fcmToken);

      //get the username of the author by his ID
      this.apiService.getUserByID(data.author).subscribe(userName => this.author = userName);



    });


  }

  RegisterToEvent() {
    //getting the author
    const currentUserID = this.apiService.toekn;
    //getting event ID from the URL
    const eventID = this.route.snapshot.params.id;
    //register to the event
    this.apiService.registerToEvent({ authorID: currentUserID, eventID: eventID })


    this.sendNotification();

  }

  sendNotification() {
    //push notification json to be sent
    this.jsonToPush =
      {
        //you need the author fcmToken so he will recive a notification
        "to": this.authorFcmToken,
        "collapse_key": "type_a",
        "notification": {
          "body": "Test",
          "title": "Hello World"
        }
      }

    //sending the json to notification to the author
    setTimeout(() => this.apiService.sendPushNotificationToAuthor(this.authorFcmToken), 5000)
  }




}




