import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from "../../../../shared/service/api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-auth-sign-in',
  templateUrl: 'sign-in.page.html',
  styleUrls: ['sign-in.page.scss']
})
export class SignInPage implements OnInit{
  public email: any;
  public password: any;

  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private apiService: ApiService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async signIn(){
    const loading = await this.loadingController.create();
    await loading.present();

    this.apiService.login(this.credentials.value).subscribe(
      async _ => {
        await loading.dismiss();
        this.router.navigateByUrl('/account/view', { replaceUrl: true });
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: res.error.msg,
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }


  signUpPage(){
    this.router.navigateByUrl('/auth/sign-up');
  }
}
