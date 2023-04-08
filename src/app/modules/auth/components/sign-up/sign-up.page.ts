import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from "../../../../shared/service/api.service";
import {LoadingController} from "@ionic/angular";

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
    public apiService: ApiService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  signUp(){

  }

  signInPage(){
    this.router.navigateByUrl('/auth/sign-in');
  }
}
