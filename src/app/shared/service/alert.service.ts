import {Injectable} from "@angular/core";
import {AlertController} from "@ionic/angular";

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(public alertCtrl: AlertController) {}
  async showAlert(header, subHeader, message) {
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}