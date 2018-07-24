import { Component } from '@angular/core';
import { ApiService } from "../../api.service";
import { MessagingService } from "../../Services/messaging.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: String;
  password: String;
  fcmToken;
  constructor(private msgService: MessagingService, private apiService: ApiService) { }
  loginUser() {
    this.fcmToken = this.msgService.getPermission()
    this.msgService.receiveMessage()
    // this.msgService = this.msgService.currentMessage
    this.apiService.loginUser({ username: this.userName, password: this.password });
  }
}
