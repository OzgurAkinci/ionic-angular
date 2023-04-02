import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../../shared/service/auth.service";

@Component({
  selector: 'app-auth-sign-in',
  templateUrl: 'sign-in.page.html',
  styleUrls: ['sign-in.page.scss']
})
export class SignInPage implements OnInit{
  public email: any;
  public password: any;

  constructor(
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }


  login(){
    this.authService.SignIn(this.email, this.password);
  }


  signup(){
    this.router.navigateByUrl('/auth/sign-up');
  }
}
