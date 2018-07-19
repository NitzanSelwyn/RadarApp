import { Component } from '@angular/core';
import { ApiService } from '../../api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private apiService: ApiService) { }

  //logout function
  logout() {
    this.apiService.logout();
  }

}
