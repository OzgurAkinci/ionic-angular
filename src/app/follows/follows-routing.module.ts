import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowsPage } from './follows.page';

const routes: Routes = [
  {
    path: '',
    component: FollowsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
