import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowPage } from './follow.page';

const routes: Routes = [
  {
    path: '',
    component: FollowPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
