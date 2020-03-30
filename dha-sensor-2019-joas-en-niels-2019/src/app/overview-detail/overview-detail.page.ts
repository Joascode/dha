import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import {
  FishingLicense,
  FishingLicenseService,
} from '../services/fishinglicense/fishing-license.service';
import { ScannerService } from '../services/scanner/scanner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-overview-detail',
  templateUrl: './overview-detail.page.html',
  styleUrls: ['./overview-detail.page.scss'],
})
export class OverviewDetailPage implements OnInit {
  public fishingLicense: FishingLicense = {
    name: 'test',
    createdAt: Date.now(),
    zone: 'Ede',
    locationKey: 'test-key',
    barcode: '',
  };

  private fishingLicenseId = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private licenseService: FishingLicenseService,
    private scannerService: ScannerService,
    private loadingController: LoadingController,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.fishingLicenseId = this.route.snapshot.params['id'];
    if (this.fishingLicenseId) {
      this.loadFishingLicense();
    }
  }
  ionViewWillLeave() {
    this.unsubscribeAll();
  }

  scan(license: FishingLicense) {
    this.navCtrl.navigateForward(['/scanner/', license.barcode], {
      animated: false,
    });
  }

  /**
   * Responsible for validating the license
   * License validation_date will be set to current date
   * @param license
   */
  async checkLicense(license: FishingLicense) {
    const loading = await this.loadingController.create({
      message: 'Vispas valideren...',
    });
    await loading.present();
    license.validation_date = Date.now();
    this.licenseService
      .updateFishingLicense(license, license.id)
      .then(async () => {
        loading.dismiss().then();
      });
  }

  async loadFishingLicense() {
    const loading = await this.loadingController.create({
      message: 'Loading license..',
    });
    await loading.present();

    this.subscriptions.push(
      this.licenseService
        .getFishingLicenseById(this.fishingLicenseId)
        .subscribe((res) => {
          loading.dismiss();
          this.fishingLicense = res;
        }),
    );
  }

  async saveFishingLicense() {
    const loading = await this.loadingController.create({
      message: 'Saving license..',
    });
    await loading.present();

    if (this.fishingLicenseId) {
      this.licenseService
        .updateFishingLicense(this.fishingLicense, this.fishingLicenseId)
        .then(() => {
          loading.dismiss();
          this.nav.back();
        });
    } else {
      this.licenseService.addFishingLicense(this.fishingLicense).then(() => {
        loading.dismiss();
        this.nav.back();
      });
    }
  }

  private unsubscribeAll() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
