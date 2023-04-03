import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../../shared/service/auth.service";
import {AccountService} from "../../../../shared/service/account.service";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {AlertController, LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-account-view',
  templateUrl: 'account-view.page.html',
  styleUrls: ['account-view.page.scss']
})
export class AccountViewPage implements OnInit{
  public email: any;
  public password: any;

  constructor(
    public router: Router,
    public authService: AuthService,
    public accountService: AccountService,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  signOut(){
    this.authService.signOut().then(() => console.log('done!'));
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos // Camera, Photos or Prompt!
    });

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.accountService.uploadImage(image);
      loading.dismiss();

      if (result != null) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }
}
