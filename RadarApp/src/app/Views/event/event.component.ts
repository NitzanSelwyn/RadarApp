import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../api.service";
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  eventMsg = '';
  createEvent() {
    //console.log(this.eventMsg)
    this.apiService.createEvents({ title: this.eventMsg });
  }
}
