import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from "../../api.service";
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-get-events',
  templateUrl: './get-events.component.html',
  styleUrls: ['./get-events.component.css']
})
export class GetEventsComponent implements OnInit {

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    //gets all events
    var color: ThemePalette;
    this.apiService.getEvents();
  }


}
