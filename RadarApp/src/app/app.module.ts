import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule, MatCardModule, MatToolbarModule, MatInputModule, MatListModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule } from "@angular/material";

import { AppComponent } from './app.component';
import { LoginComponent } from './Views/login/login.component';
import { RegisterComponent } from './Views/register/register.component';
import { HeaderComponent } from './Views/header/header.component';
import { EventComponent } from './Views/event/event.component';

import { ApiService } from "./api.service";
import { AuthInterceptorService } from "./Services/authinterceptor.service";
import { AuthService } from './Services/auth.service';

import { environment } from "../environments/environment";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";

import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './Views/map/map.component';
import { GetEventsComponent } from './Views/get-events/get-events.component';
import { EventDetailsComponent } from './Views/event-details/event-details.component';

const routes = [
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "event", component: EventComponent },
  { path: "map", component: MapComponent },
  { path: "events", component: GetEventsComponent },
  { path: "events/:id", component: EventDetailsComponent }
];

@NgModule({
  imports: [
    MatButtonModule, MatCardModule, MatToolbarModule, MatInputModule, MatListModule, MatCheckboxModule,
    MatDatepickerModule, MatNativeDateModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase, 'raderapp'),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDHa-IemARHxYO0qdoZPKpxHOlX-1r9KG8',
      libraries: ["places"],
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
  }, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
