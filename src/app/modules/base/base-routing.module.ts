import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasePage } from './base.page';
import {SettingsPage} from './components/settings/settings.page';

const routes: Routes = [
  {
    path: '',
    component: BasePage,
    children: [
      {
        path: 'settings',
        component: SettingsPage
      },
      {
        path: '',
        redirectTo: '/base/settings',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class BaseRoutingModule {}
