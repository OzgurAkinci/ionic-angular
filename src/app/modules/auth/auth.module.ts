import { IonicModule } from '@ionic/angular';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AuthPage} from './auth.page';
import {SignInPage} from './components/sign-in/sign-in.page';
import {SignUpPage} from './components/sign-up/sign-up.page';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AuthPage, SignInPage, SignUpPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AuthModule {}
