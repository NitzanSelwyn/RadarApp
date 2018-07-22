import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private route: Router) { }

  events = []

  TOKEN_KEY = 'token';

  authPath = environment.path + '/auth'
  path = environment.path;


  get toekn() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  registerUser(user) {
    this.http.post<any>(this.authPath + '/register', user).subscribe(res => {
      console.log(res);
      localStorage.setItem(this.TOKEN_KEY, res.token)
    });
    if (!this.isAuthenticated) {
      this.route.navigateByUrl("/");
    }
    else {
      console.log('Register Failed')
    }
  }

  loginUser(user) {
    this.http.post<any>(this.authPath + '/login', user).subscribe(res => {
      localStorage.setItem('token', res.token)
    });
    if (!this.isAuthenticated) {
      this.route.navigateByUrl("/");
    }
    else {
      console.log('Login Failed')
    }
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getEvents() {
    this.http.get<any>(this.path + '/events').subscribe(res => {
      this.events = res;
      console.log(res);
    });
  }

  getEventsDetails(id) {
    return this.http.get<any>(this.path + '/events/' + id)
  }

  createEvents(post) {
    this.http.post<any>(this.path + '/event', post).subscribe(res => {
      this.events = res;
      console.log(res);
    });

  }

}
