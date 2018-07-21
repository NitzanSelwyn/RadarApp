import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule, MatCardModule, MatToolbarModule, MatInputModule, MatListModule,
  MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule, MatPaginatorModule
} from "@angular/material";
import { MatSliderModule } from '@angular/material/slider';

import { AppComponent } from './app.component';
import { LoginComponent } from './Views/login/login.component';
import { RegisterComponent } from './Views/register/register.component';
import { HeaderComponent } from './Views/header/header.component';
import { EventComponent } from './Views/event/event.component';

import { ApiService } from "./api.service";
import { AuthInterceptorService } from "./Services/authinterceptor.service";
import { AuthService } from './Services/auth.service';
import { MessagingService } from './Services/messaging.service';
import * as firebase from 'firebase';

import { environment } from "../environments/environment";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";

import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './Views/map/map.component';
import { GetEventsComponent } from './Views/get-events/get-events.component';
import { EventDetailsComponent } from './Views/event-details/event-details.component';

import { mapstyles } from "./Views/map/map.style";

const routes = [
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "event", component: EventComponent },
  { path: "map", component: MapComponent },
  { path: "events", component: GetEventsComponent },
  { path: "events/:id", component: EventDetailsComponent }
];


firebase.initializeApp(environment.firebase)

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),

    MatButtonModule, MatCardModule, MatToolbarModule, MatInputModule, MatListModule, MatCheckboxModule,
    MatDatepickerModule, MatNativeDateModule, MatChipsModule, MatPaginatorModule, MatSliderModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey,
      libraries: ["places", "geometry"],
    }),
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    EventComponent,
    MapComponent,
    GetEventsComponent,
    EventDetailsComponent,

  ],
  providers: [ApiService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  }, AuthService, mapstyles, MessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
