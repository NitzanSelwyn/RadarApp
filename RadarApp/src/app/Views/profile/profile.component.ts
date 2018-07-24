import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  userProfile = {};

  ngOnInit() {
    // let token = this.apiService.toekn;
    this.apiService.getUserProfile(this.apiService.toekn).subscribe(user => {
      console.log(user)
      this.userProfile = user
    });
  }

}
