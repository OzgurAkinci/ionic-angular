import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {BaseRoutingModule} from './base-routing.module';
import {BasePage} from './base.page';
import {SettingsPage} from './components/settings/settings.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BaseRoutingModule
  ],
  declarations: [BasePage, SettingsPage]
})
export class BaseModule {}
