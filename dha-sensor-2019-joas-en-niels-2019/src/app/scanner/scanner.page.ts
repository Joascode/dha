import {Component, OnDestroy} from '@angular/core';
import {FishingLicenseService} from '../services/fishinglicense/fishing-license.service';
import {ScannerService, ScannerStatus} from '../services/scanner/scanner.service';
import {ScannerAlertService} from '../services/alert/scanner-alert.service';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnDestroy {
    private scannedData: string;
    private subscriptions: Subscription[] = [];
    private expectedQRCode: string;

    constructor(private qrScanner: QRScanner,
                private scannerService: ScannerService,
                private scannerAlertService: ScannerAlertService,
                private fishingLicenseService: FishingLicenseService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnDestroy(): void {
        this.stopScanning();
        this.unsubscribeAll();
    }

    ionViewWillEnter() {
        this.expectedQRCode = this.activatedRoute.snapshot.paramMap.get('expectedQRCode');
        this.startScanning();
    }
    ionViewWillLeave() {
        this.qrScanner.destroy();
    }

    startScanning() {
        this.clearFields();
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    this.showScanner();
                } else if (status.denied) {
                    this.qrScanner.openSettings();
                } else {
                    this.scannerAlertService.presentAlertWithScannerStatus('Probeer het opnieuw.', ScannerStatus.Invalid);
                }
            })
            .catch((e: any) => console.log('Error is', e));
    }

    showScanner() {
        this.qrScanner.show();
        this.subscriptions.push(this.qrScanner.scan().subscribe((scannedQRCode: string) => {
            this.subscriptions.push(this.fishingLicenseService.getFishingLicenseQRCodes().subscribe( qrCodes => {
                    this.scannerService.verifyQRCode(qrCodes, scannedQRCode).then( scannerStatus => {
                        if (scannerStatus === ScannerStatus.Checked) {
                            this.fishingLicenseService.validateFishingLicenseByBarcode(scannedQRCode);
                        }
                        this.scannerAlertService.presentAlertWithScannerStatus(scannedQRCode, scannerStatus);
                        this.scannedData = scannedQRCode;
                    });
                    this.stopScanning();
                    this.unsubscribeAll();
                }));
        }));
    }

    stopScanning() {
        this.qrScanner.destroy();
    }

    private unsubscribeAll() {
        this.subscriptions.forEach( subscription => subscription.unsubscribe());
    }

    private clearFields() {
        this.scannedData = '';
        this.expectedQRCode = '';
    }

}
