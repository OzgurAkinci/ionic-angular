import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../../shared/service/auth.service";
import {AlertService} from "../../../../shared/service/alert.service";

@Component({
  selector: 'app-auth-sign-in',
  templateUrl: 'sign-in.page.html',
  styleUrls: ['sign-in.page.scss']
})
export class SignInPage implements OnInit{
  public email: any;
  public password: any;
  public loading = false;

  constructor(
    public router: Router,
    public authService: AuthService,
    public alertService: AlertService
  ) { }

  ngOnInit() {
  }

  login(){
    this.loading = true;
    this.authService.signIn(this.email, this.password).then(() => {
      this.loading = false;
    });
  }


  signup(){
    this.router.navigateByUrl('/auth/sign-up');
  }
}
