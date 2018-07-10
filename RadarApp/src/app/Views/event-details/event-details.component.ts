import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../api.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }


  newEvent = {};

  ngOnInit() {
    let id = this.route.snapshot.params.id;
    this.apiService.getEventsDetails(id).subscribe(data => this.newEvent = data)
  }

}
