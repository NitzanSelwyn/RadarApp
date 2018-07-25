import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../api.service";
import { MessagingService } from "../../Services/messaging.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private msgService: MessagingService, private apiService: ApiService) {
    this.msgService.getPermission()
    this.msgService.receiveMessage()
  }

  ngOnInit() {
    // this.fcmToken = this.msgService.getPermission();
  }
  firstname: String;
  lastname: String;
  username: String;
  password: String;
  fcmToken;

  //register function
  registerUser() {
    this.fcmToken = this.apiService.fcmToken;

    this.apiService.registerUser({
      firstname: this.firstname, lastname: this.lastname,
      username: this.username, password: this.password,
      fcmToken: this.fcmToken
    });

    setTimeout(() => this.apiService.updateFcmToken({ fcmToken: this.fcmToken, userToken: this.apiService.toekn }), 5000)

  }
}
