import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/service/auth.service";

@Component({
  selector: 'app-account-verify',
  templateUrl: 'account-verify.page.html',
  styleUrls: ['account-verify.page.scss']
})
export class VerifyEmailPage implements OnInit{
  public email: any;
  public password: any;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }
}
