import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AccountPage} from "./account.page";
import {AccountViewPage} from "./components/account-view/account-view.page";
import {AccountRoutingModule} from "./account-routing.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AccountRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AccountPage, AccountViewPage]
})
export class AccountModule {}
