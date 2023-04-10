import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from "../../../../shared/service/account.service";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {AlertController, LoadingController, ModalController, ScrollDetail} from "@ionic/angular";
import {AuthService} from "../../../../shared/service/auth.service";
import {ProfilePhotoOptionComponent} from "../profile-photo-option/profile-photo-option.page";

@Component({
  selector: 'app-account-view',
  templateUrl: 'account-view.page.html',
  styleUrls: ['account-view.page.scss']
})
export class AccountViewPage implements OnInit{
  public currentUser: any;
  photo = 'https://i.pravatar.cc/150';
  showToolbar = false;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private apiService: AuthService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.currentUser = this.apiService.currentUser;
  }

  signOut(){
    this.apiService.logout();
  }

  async openOptionSelection() {
    const modal = await this.modalController.create({
      component: ProfilePhotoOptionComponent,
      cssClass: 'transparent-modal'
    });
    modal.onDidDismiss().then(res => {
        console.log(res);
        if (res.role !== 'backdrop') {
          this.takePicture(res.data);
        }
      });
    return await modal.present();
  }

  async takePicture(type) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource[type]
    });
    this.photo = image.webPath;
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos // Camera, Photos or Prompt!
    });

    /*
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

     */
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 225;
    }
  }


}
