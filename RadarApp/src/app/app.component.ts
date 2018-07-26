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

  ngOnInit() { }
}
