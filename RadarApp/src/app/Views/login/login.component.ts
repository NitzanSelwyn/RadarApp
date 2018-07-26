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
  constructor(private msgService: MessagingService, private apiService: ApiService) {
    this.msgService.getPermission()
    this.msgService.receiveMessage()

  }
  //loging the user
  loginUser() {
    this.apiService.loginUser({ username: this.userName, password: this.password });
    //getting a new fcmToken
    this.fcmToken = this.apiService.fcmToken;
    //update current user fcmToken with the new one
    setTimeout(() => this.apiService.updateFcmToken({ fcmToken: this.fcmToken, userToken: this.apiService.toekn }), 3000)




  }


}
