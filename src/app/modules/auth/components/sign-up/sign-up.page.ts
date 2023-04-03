import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../../shared/service/auth.service";
import {AlertService} from "../../../../shared/service/alert.service";
import {LoadingService} from "../../../../shared/service/loading.service";

@Component({
  selector: 'app-auth-sign-up',
  templateUrl: 'sign-up.page.html',
  styleUrls: ['sign-up.page.scss']
})
export class SignUpPage implements OnInit{
  public email: any;
  public password: any;

  constructor(
    public router: Router,
    public authService: AuthService,
    public loadingService: LoadingService
  ) { }

  ngOnInit() {
  }

  signUp(){
    this.loadingService.present();
    this.authService.signUp(this.email, this.password).then(() => {
      this.loadingService.dismiss();
    });
  }

  signInPage(){
    this.router.navigateByUrl('/auth/sign-in');
  }
}
