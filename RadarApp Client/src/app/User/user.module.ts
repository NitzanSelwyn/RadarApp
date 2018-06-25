import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LoginComponent } from "./login/login.component";
import { RegistarComponent } from "./registar/registar.component";

@NgModule({
    declarations: [
        LoginComponent,
        RegistarComponent
    ],
    imports: [
        BrowserModule
    ],
    exports: [
        LoginComponent,
        RegistarComponent,
    ],
    providers: [],
    bootstrap: []
})
export class UserModule { }