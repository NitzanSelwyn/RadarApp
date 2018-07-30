import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import { environment } from "../environments/environment";
import { RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private route: Router) { }

  events = []

  TOKEN_KEY = environment.TOKEN_KEY;

  authPath = environment.authPath;
  path = environment.path;

  userToken;

  //getting the "token" from the localStorage
  get toekn() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  //check if there is a "token"
  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  //getting the FcmToken from the localStorage
  get fcmToken() {
    return localStorage.getItem('fcmToken');
  }

  //registering to the app by sending your info to the server and saving to DB
  //getting a decoded "token"
  registerUser(user) {
    this.http.post<any>(this.authPath + '/register', user).subscribe(res => {
      //saving "token" to localStorage
      localStorage.setItem(this.TOKEN_KEY, res.token)
    });
    if (!this.isAuthenticated) {
      //check if there is a "token" and continue to main page
      this.route.navigateByUrl("/");
    }
    else {
      console.log('Register Failed')
    }
  }

  //login the user by sending the user name & password to the server to be compard with data from the DB
  //if the user exist getting the user id and encode it with jwt and send it to the front-end
  loginUser(user) {
    this.http.post<any>(this.authPath + '/login', user).subscribe(res => {
      //saving the decoded id to localStorage as "token"
      localStorage.setItem('token', res.token)
      this.userToken = localStorage.getItem('token');
    });
    if (!this.isAuthenticated) {
      //check if there is a "token" and continue to main page
      this.route.navigateByUrl("/");
    }
    else {
      console.log('Login Failed')
    }
  }

  updateFcmToken(userData) {
    this.http.put(this.path + '/updateuser', userData).subscribe(res => {
    })
  }

  //logout by removing the token fom the localStorage
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('fcmToken');
  }

  //getting all the events from the DB
  getEvents() {
    this.http.get<any>(this.path + '/events').subscribe(res => {
      this.events = res;
    });
  }

  //getting the event details by sending the ID of the event to server and returning the data of that event
  getEventsDetails(id) {
    return this.http.get<any>(this.path + '/events/' + id)
  }

  //creating new event by sending all the fields from the create event tap to the server to be saved to the DB
  createEvents(post) {
    this.http.post<any>(this.path + '/event', post).subscribe(res => {
      this.events = res;
    });

  }

  //getting the author User Name to be shown in the more details 
  getUserByID(id) {
    return this.http.get(this.path + '/users/' + id, { responseType: 'text' });
  }

  //getting the author FcmToken so you can send him push notification
  getUserFcmToken(id) {
    return this.http.get(this.path + '/users/fcmToken/' + id, { responseType: 'text' });
  }

  // registering to event by sending your token to the server to be decoded to your id and saving your id to the participants feild 
  // in the DB
  registerToEvent(data) {
    this.http.put(this.path + '/events', data).subscribe(res => {
      console.log(res);
    })

  }

  //sending push notification to the author of the event that you register to
  sendPushNotificationToAuthor(data) {
    return this.http.post(this.path + '/notify', data, {
      //headers must contain Authorization key from firebase to be able to send  push notification & and the content type must be 
      //application/json that contain "to": the author of the event and a "notification" that as title & body
      headers: new HttpHeaders()
        //the request MUST contain an a Access-Control-Allow-Origin header
        .set('Access-Control-Allow-Origin', '*')
        //MUST contain an Authorization header with the value key from your firebase
        .set('Authorization', 'key=AIzaSyDV6hcrbzVzzgp4FIs4G488IZ_NWVjd7xA')
        //content type MUST be application/json
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Headers', 'content-type')
        .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    })
  }

}



