import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

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
  ) { }

  ngOnInit() {
  }


  login(){}


  signin(){
    this.router.navigateByUrl('/auth/sign-in');
  }
}
