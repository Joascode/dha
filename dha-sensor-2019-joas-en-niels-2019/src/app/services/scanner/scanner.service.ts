import { Injectable } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import {FishingLicenseService, QRCode} from '../fishinglicense/fishing-license.service';
import {DateService} from '../date/date.service';
import {ToastController} from '@ionic/angular';
interface IScanner {
    scanResult(): string;
}
@Injectable({
  providedIn: 'root'
})
export class ScannerService {

    constructor(
      private qrScanner: QRScanner,
      private licenseService: FishingLicenseService,
      private dateService: DateService) {
    }

    verifyQRCode(qrCodeList: QRCode[], expectedQRCode: string) {
        return this.findQRCode(qrCodeList, expectedQRCode).then( async qrCode => {
            if (qrCode) {
                if (this.isQRCodeAlreadyCheckedToday(qrCode)) {
                    return ScannerStatus.AlreadyChecked;
                } else {
                    return ScannerStatus.Checked;
                }
            } else {
                return ScannerStatus.Invalid;
            }
        });
    }

    private async findQRCode(QRCodeList: QRCode[], expectedQRCode: string) {
        return QRCodeList.find(x => x.code.toLocaleLowerCase() === expectedQRCode.toLocaleLowerCase());
    }

    private isQRCodeAlreadyCheckedToday(qrCode: QRCode) {
        return this.dateService.formatDate(qrCode.validation_date) === this.dateService.formatDate(Date.now());
    }


}
export enum ScannerStatus {
  Checked,
  AlreadyChecked,
  Invalid
}
