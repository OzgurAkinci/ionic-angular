import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase services + environment module
import {AngularFireModule} from '@angular/fire/compat';
import {environment} from "../environments/environment";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./shared/interceptor/jwt.interceptor";

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
      HttpClientModule,
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
