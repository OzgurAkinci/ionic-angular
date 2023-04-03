import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../../shared/service/auth.service";
import {AlertService} from "../../../../shared/service/alert.service";
import {LoadingService} from "../../../../shared/service/loading.service";

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
    public authService: AuthService,
    public loadingService: LoadingService
  ) { }

  ngOnInit() {
  }

  signIn(){
    this.loadingService.present();
    this.authService.signIn(this.email, this.password).then(() => {
      this.loadingService.dismiss();
    });
  }


  signUpPage(){
    this.router.navigateByUrl('/auth/sign-up');
  }
}
