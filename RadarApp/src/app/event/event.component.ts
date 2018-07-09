import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  post(post) {
    this.apiService.createEvents(post);
  }
}
