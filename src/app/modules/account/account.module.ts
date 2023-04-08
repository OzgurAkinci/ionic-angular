import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AccountPage} from "./account.page";
import {AccountViewPage} from "./components/account-view/account-view.page";
import {AccountRoutingModule} from "./account-routing.module";
import {VerifyEmailPage} from "./components/verify-email/verify-email.page";
import {ProfilePhotoOptionComponent} from "./components/profile-photo-option/profile-photo-option.page";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AccountRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AccountPage, AccountViewPage, VerifyEmailPage, ProfilePhotoOptionComponent],
  providers: []
})
export class AccountModule {}
