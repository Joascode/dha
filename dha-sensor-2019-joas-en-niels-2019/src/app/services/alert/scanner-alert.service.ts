import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular';
import { ScannerStatus} from '../scanner/scanner.service';

@Injectable({
  providedIn: 'root'
})
export class ScannerAlertService {
  constructor( private alertController: AlertController) { }

  async presentAlertWithScannerStatus(text: string, scannerStatus: ScannerStatus) {
    let alert = await this.alertController.create({
      header: 'Scan geannuleerd',
      subHeader: 'Vispas is niet gevalideerd.',
      message: text,
      buttons: ['OK']
    });

    switch (scannerStatus) {
      case ScannerStatus.Checked:
        alert  = await this.alertController.create({
          header: 'Scan voltooid',
          subHeader: 'Vispas is gevalideerd.',
          message: text,
          buttons: ['OK'],
          cssClass: 'custom-alert alert-success'
        });
        break;
      case ScannerStatus.AlreadyChecked:
        alert = await this.alertController.create({
          header: 'Scan voltooid',
          subHeader: 'Vispas is reeds gevalideerd.',
          message: text,
          buttons: ['OK'],
          cssClass: 'custom-alert alert-success',
        });
        break;
      case ScannerStatus.Invalid:
        alert = await this.alertController.create({
          header: 'Scan geannuleerd',
          subHeader: 'Vispas is niet geldig.',
          message: text,
          buttons: ['OK'],
          cssClass: 'custom-alert alert-danger',
        });
        break;
    }
    await alert.present();
  }
}



