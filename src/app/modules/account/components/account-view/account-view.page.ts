import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../../shared/service/auth.service";

@Component({
  selector: 'app-account-view',
  templateUrl: 'account-view.page.html',
  styleUrls: ['account-view.page.scss']
})
export class AccountViewPage implements OnInit{
  public email: any;
  public password: any;

  constructor(
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  signOut(){
    this.authService.signOut().then(() => console.log('done!'));
  }
}
