import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { EventComponent } from './event/event.component';
import { MapComponent } from './map/map.component';
import { GetEventsComponent } from './get-events/get-events.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ProfileComponent } from './profile/profile.component';


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
        RouterModule.forRoot(routes),
    ],
    exports: [
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        EventComponent,
        MapComponent,
        MapComponent,
        GetEventsComponent,
        EventDetailsComponent
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        EventComponent,
        MapComponent,
        MapComponent,
        GetEventsComponent,
        EventDetailsComponent,
        ProfileComponent
    ],
    providers: [],
    bootstrap: []
})
export class ViewModule { }