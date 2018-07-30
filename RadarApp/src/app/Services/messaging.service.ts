import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import * as firebase from 'firebase';
import 'rxjs/add/operator/take';

@Injectable()
export class MessagingService {

  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.messaging.usePublicVapidKey("BBG16voCUhcfKA4rcIbLOZ0VQta3uFFSaBdfrx3IgnhR7oTRKBbWOIWOTifQ8QF9zV6bHlkZlrJh8HIbJvbdxj8");
  }

  //update the token if the user cleared his browser setting
  updateToken(token) {
    this.afAuth.authState.take(1).subscribe(user => {
      if (!user) return;
      //getting the user uID and new token
      const data = { [user.uid]: token }
      //updateing in firebase database
      this.db.object('fcmTokens/').update(data)
    });
  }

  //request premission for firebase messaging
  getPermission(): any {
    //request premission
    this.messaging.requestPermission()
      .then(() => {
        //if there were no error loging ro console
        console.log('Notification permission granted.');
        //returning token
        return this.messaging.getToken()
      })
      .then(token => {
        //update the token
        this.updateToken(token)
        //savining the token to localStorage
        localStorage.setItem('fcmToken', token);
      })
      .catch((err) => {
        //if there was an error logging it to console
        console.log('Unable to get permission to notify.', err);
        return
      });
  }


  //getting a new notification
  receiveMessage() {
    //registering to OnMessage
    this.messaging.onMessage((payload) => {
      //if recived message logging it
      console.log("Message received. ", payload);
      // saving the message to the BehaviorSubject
      this.currentMessage.next(payload)
    });
  }
}
