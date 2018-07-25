// import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase';

// import '@firebase/messaging'

// import 'rxjs/add/operator/take';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject'

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

  updateToken(token) {
    this.afAuth.authState.take(1).subscribe(user => {
      if (!user) return;
      const data = { [user.uid]: token }
      this.db.object('fcmTokens/').update(data)
    });
  }

  getPermission(): any {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(token => {
        this.updateToken(token)
        localStorage.setItem('fcmToken', token);
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
        return
      });
  }


  receiveMessage() {
    //  debugger;
    this.messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
      this.currentMessage.next(payload)
    });
  }
}
