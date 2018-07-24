import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../api.service";
import { MessagingService } from "../../Services/messaging.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private msgService: MessagingService, private apiService: ApiService) { }

  ngOnInit() {
  }
  firstname: String;
  lastname: String;
  username: String;
  password: String;
  // fcmToken: String;

  //register function
  registerUser() {
    var fcmToken = this.msgService.getPermission();
    this.apiService.registerUser({
      firstname: this.firstname, lastname: this.lastname,
      username: this.username, password: this.password,
      fcmToken: fcmToken
    });
  }



}
