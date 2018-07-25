import { Component, OnInit } from "@angular/core";
import { MessagingService } from "./Services/messaging.service";

import { FirebaseAuthService } from './services/firebase-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  user;
  message;

  constructor(private msgService: MessagingService, private _auth: FirebaseAuthService) { }

  ngOnInit() {
    // this.msgService.getPermission()
    this.msgService.receiveMessage()
    this.message = this.msgService.currentMessage
  }

  // loginWithGoogle() {
  //   this._auth.googleLogin().then(() => {
  //     this.user = this._auth.currentUser;

  //     this.msgService.getPermission();
  //     this.msgService.receiveMessage();
  //     this.msgService.currentMessage.subscribe((message) => {
  //       // debugger;
  //       this.message = message
  //     });
  //   });
  // }

  // logout() {
  //   this._auth.signOut().then(() => {
  //     this.user = null;
  //   });
  // }

}
