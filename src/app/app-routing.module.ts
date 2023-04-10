import {inject, NgModule} from '@angular/core';
import {PreloadAllModules, provideRouter, RouterModule, Routes, withPreloading} from '@angular/router';
import {AuthService} from "./shared/service/auth.service";
import {AuthGuard} from "./shared/guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'base',
    loadChildren: () => import('./modules/base/base.module').then(m => m.BaseModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule),
    //canMatch: [() => inject(AuthService).isAuthenticated],
    canLoad: [AuthGuard]
  }
];
@NgModule({
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules))
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
