import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import {HomePage} from "./components/home/home.page";
import {FollowsPage} from "./components/follows/follows.page";
import {LikesPage} from "./components/likes/likes.page";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  exports: [
    TabsPage
  ],
  declarations: [TabsPage, HomePage, FollowsPage, LikesPage]
})
export class TabsPageModule {}
