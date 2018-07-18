import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../api.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() { }

  //register function
  registerUser(user) {
    this.apiService.registerUser(user);
  }



}
