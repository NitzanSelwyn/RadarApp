import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  authPath = 'http://localhost:3000/auth'
  path = 'http://localhost:3000/';


  registerUser(user) {
    this.http.post(this.authPath + '/register', user).subscribe(res => {
      console.log(res);
    });
  }

  loginUser(user) {
    this.http.post(this.authPath + '/login', user).subscribe(res => {
      console.log(res);
    });
  }

  createEvents(post) {
    this.http.post(this.path + '/event', post).subscribe(res => {
      console.log(res);
    });

  }

}
