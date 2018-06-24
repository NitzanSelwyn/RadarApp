import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegistarComponent } from './user/registar/registar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
