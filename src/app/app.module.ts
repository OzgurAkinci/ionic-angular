import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase services + environment module
import {AngularFireModule, FIREBASE_OPTIONS} from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {AngularFireDatabase, AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {environment} from "../environments/environment";
import { AuthService } from './shared/service/auth.service';
import {AccountService} from "./shared/service/account.service";
import {Auth} from "@angular/fire/auth";

@NgModule({
    declarations: [AppComponent],
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      AngularFirestoreModule,
      AngularFireStorageModule,
      AngularFireDatabaseModule,
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule
    ],
    providers: [
        AuthService,
      /*{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }, */
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
