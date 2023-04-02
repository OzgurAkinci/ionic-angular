import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountPage} from "./account.page";
import {AccountViewPage} from "./components/account-view/account-view.page";

const routes: Routes = [
  {
    path: '',
    component: AccountPage,
    children: [
      {
        path: 'view',
        component: AccountViewPage
      },
      {
        path: '',
        redirectTo: '/account/view',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AccountRoutingModule {}
