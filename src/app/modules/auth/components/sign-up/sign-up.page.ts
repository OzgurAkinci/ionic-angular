import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../../shared/service/auth.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth-sign-up',
  templateUrl: 'sign-up.page.html',
  styleUrls: ['sign-up.page.scss']
})
export class SignUpPage implements OnInit{
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public authService: AuthService,
    public loadingController: LoadingController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async signUp() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.signUp(this.credentials.value).subscribe(
      async _ => {
        await loading.dismiss();
        this.signInPage();
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Failed',
          message: res.error.error,
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

  signInPage(){
    this.router.navigateByUrl('/auth/sign-in', { replaceUrl: true });
  }
}
