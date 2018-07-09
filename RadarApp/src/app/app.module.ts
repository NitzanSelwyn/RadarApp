import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule, MatCardModule, MatToolbarModule, MatInputModule } from "@angular/material";

import { AppComponent } from './app.component';
import { LoginComponent } from './Views/login/login.component';
import { RegisterComponent } from './Views/register/register.component';
import { HeaderComponent } from './Views/header/header.component';
import { EventComponent } from './event/event.component';

import { ApiService } from "./api.service";

import { AgmCoreModule } from '@agm/core';

const routes = [
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "events", component: EventComponent },
];

@NgModule({
  imports: [
    MatButtonModule, MatCardModule, MatToolbarModule, MatInputModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDHa-IemARHxYO0qdoZPKpxHOlX-1r9KG8'
    }),
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    EventComponent,

  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
