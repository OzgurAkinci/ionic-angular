import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {BaseRoutingModule} from './base-routing.module';
import {BasePage} from './base.page';
import {ExploreContainerComponentModule} from '../explore-container/explore-container.module';
import {SettingsPage} from './components/settings.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BaseRoutingModule,
    ExploreContainerComponentModule
  ],
  declarations: [BasePage, SettingsPage]
})
export class BaseModule {}
