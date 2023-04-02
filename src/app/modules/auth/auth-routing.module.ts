import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthPage} from './auth.page';
import {SignInPage} from './components/sign-in/sign-in.page';
import {SignUpPage} from './components/sign-up/sign-up.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      {
        path: 'sign-in',
        component: SignInPage
      },
      {
        path: 'sign-up',
        component: SignUpPage
      },
      {
        path: '',
        redirectTo: '/auth/sign-in',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule {}
