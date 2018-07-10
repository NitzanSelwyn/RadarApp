import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule, MatCardModule, MatToolbarModule, MatInputModule } from "@angular/material";

import { AppComponent } from './app.component';
import { LoginComponent } from './Views/login/login.component';
import { RegisterComponent } from './Views/register/register.component';
import { HeaderComponent } from './Views/header/header.component';
import { EventComponent } from './Views/event/event.component';

import { ApiService } from "./api.service";
import { AuthInterceptorService } from "./Services/authinterceptor.service";

import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './Views/map/map.component';
import { GetEventsComponent } from './Views/get-events/get-events.component';

const routes = [
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "event", component: EventComponent },
  { path: "map", component: MapComponent },
  { path: "events", component: GetEventsComponent },
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
    MapComponent,
    GetEventsComponent,

  ],
  providers: [ApiService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
