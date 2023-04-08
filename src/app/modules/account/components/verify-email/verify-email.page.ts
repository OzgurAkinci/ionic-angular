import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-account-verify',
  templateUrl: 'account-verify.page.html',
  styleUrls: ['account-verify.page.scss']
})
export class VerifyEmailPage implements OnInit{
  public email: any;
  public password: any;

  constructor() { }

  ngOnInit() {
  }
}
