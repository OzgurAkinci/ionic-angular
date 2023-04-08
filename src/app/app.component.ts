import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { TabsPage } from './modules/tabs/tabs.page';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "./shared/service/auth.service";

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  rootPage: any = TabsPage;
  version = '0.0.1';
  loggedIn$:Observable<boolean>

  public appPages = [
    {
      title: 'Home',
      url: '/tabs/home',
      icon: 'home',
    },
    {
      title: 'Follows',
      url: '/tabs/follows',
      icon: 'list',
    },
    {
      title: 'Likes',
      url: '/tabs/likes',
      icon: 'mail-outline',
    },
    {
      title: 'Settings',
      url: '/base/settings',
      icon: 'settings',
    },
    {
      title: 'Sign in',
      url: '/auth/sign-in',
      icon: 'person',
    },
    {
      title: 'Account',
      url: '/account/view',
      icon: 'person',
    },
  ];

  constructor(private platform: Platform, private router: Router,
              private authService: AuthService) {
    this.initializeApp();

    this.loggedIn$ = this.authService.isAuthenticated;

    if(this.loggedIn$ && this.authService.currentUser && !this.authService.currentUser.isEmailVerified) {
      this.router.navigate(['/account/verify-email']).then(() => console.log('done!'));
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.styleDefault();
      //this.splashScreen.hide();

    });
  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    /*if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Set the root of the nav with params if it's a tab index
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    } */
  }
}
