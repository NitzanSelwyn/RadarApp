import { Component } from '@angular/core';
import { ApiService } from "../../api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private apiService: ApiService) { }
  loginUser(user) {
    this.apiService.loginUser(user);
  }
}
