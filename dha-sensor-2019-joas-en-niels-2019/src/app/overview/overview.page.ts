import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import {
  FishingLicense,
  FishingLicenseService,
} from '../services/fishinglicense/fishing-license.service';
import { Subscription } from 'rxjs';
import { DateService } from '../services/date/date.service';
import { GeolocationService } from '../services/geolocation/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { debounceTime } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { GeoPoint } from '@firebase/firestore-types';
import { AlgoliaFishingLicenseService } from '../services/algolia-fishinglicense/algolia-fishing-license.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnDestroy {
  public licences: FishingLicense[];
  public checkedLicenses: FishingLicense[];
  public uncheckedLicenses: FishingLicense[];
  public currentLong: number;
  public currentLat: number;

  private subscriptions: Subscription[] = [];

  constructor(
    private navCtrl: NavController,
    private licenseService: FishingLicenseService,
    private loadingController: LoadingController,
    private dateService: DateService,
    private geolocationService: GeolocationService,
    private geolocation: Geolocation,
    private algoliaLicenseService: AlgoliaFishingLicenseService,
  ) {
    geolocation
      .watchPosition()
      .pipe(debounceTime(1000))
      .subscribe(
        (position) => {
          console.log(position);
          this.currentLong = position.coords.longitude;
          this.currentLat = position.coords.latitude;
        },
        (err) => console.log(err),
        () => console.log('Watching position completed'),
      );
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  ionViewWillEnter() {
    this.loadFishingLicense();
  }

  ionViewWillLeave() {
    this.unsubscribeAll();
  }

  goToScanner() {
    this.unsubscribeAll();
    this.navCtrl.navigateForward('/scanner', { animated: false });
  }

  scan(license: FishingLicense) {
    this.unsubscribeAll();
    this.navCtrl.navigateForward(['/scanner/', license.barcode], {
      animated: false,
    });
  }

  setFirestoreLocation() {
    this.geolocationService.setNewLocation(
      'button-test',
      new firebase.firestore.GeoPoint(this.currentLat, this.currentLong),
    );
  }

  setCurrentQueryLocation() {
    console.log('Updating current location');
    this.geolocationService.updateGeolocationQuery(
      this.currentLat,
      this.currentLong,
    );
  }

  startScanningGeoDocuments() {
    this.geolocationService.startGeolocationScanning((values) => {
      console.log('New values');
      console.log(values);
    });
  }

  filterLicensesByLocation() {
    this.geolocationService.startGeolocationScanning((values) => {
      console.log('New values');
      console.log(values);
      const ids = new Array<string>();
      values.forEach((value) => {
        ids.push(value.id);
        console.log(value.id);
      });
      if (ids.length > 0) {
        this.algoliaLicenseService.findMultipleFishingLicenses(ids);
      }
    });
  }

  async remove(id: string) {
    const loading = await this.loadingController.create({
      message: 'Vispas verwijderen...',
    });
    await loading.present();
    this.licenseService.removeFishingLicenses(id).then(() => {
      loading.dismiss().then();
    });
  }

  /**
   * Responsible for loading the fishing licenses
   */
  async loadFishingLicense() {
    const loading = await this.loadingController.create({
      message: 'Loading licenses...',
    });
    await loading.present();
    this.algoliaLicenseService.findAllFishingLicenses();
    this.subscriptions.push(
      this.algoliaLicenseService.algoliaResult$.subscribe((res) => {
        console.log(res);
        this.licences = res;
        this.uncheckedLicenses = res.filter(
          (license) =>
            this.dateService.formatDate(license.validation_date) !==
            this.dateService.formatDate(Date.now()),
        );
        this.checkedLicenses = res.filter(
          (license) =>
            this.dateService.formatDate(license.validation_date) ===
            this.dateService.formatDate(Date.now()),
        );
        loading.dismiss().then();
      }),
    );

    // this.subscriptions.push(
    //   this.licenseService.getFishingLicenses().subscribe((res) => {
    //     this.licences = res;
    //     this.uncheckedLicenses = res.filter(
    //       (license) =>
    //         this.dateService.formatDate(license.validation_date) !==
    //         this.dateService.formatDate(Date.now()),
    //     );
    //     this.checkedLicenses = res.filter(
    //       (license) =>
    //         this.dateService.formatDate(license.validation_date) ===
    //         this.dateService.formatDate(Date.now()),
    //     );
    //     loading.dismiss().then();
    //   }),
    // );
  }

  /**
   * Responsible for validating the license
   * License validation_date will be set to current date
   * @param license: The fishing license to check on.
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

  /**
   * This function is for testing purposes only.
   * Remove this function on release.
   */
  createTempLicense() {
    const zone = 'Arnhem';
    this.geolocationService
      .setNewLocation(
        zone,
        new firebase.firestore.GeoPoint(this.currentLat, this.currentLong),
      )
      .then((key) => {
        const tempFishingLicense: FishingLicense = {
          name: 'Vispas' + this.licences.length + '',
          createdAt: Date.now(),
          zone: zone,
          locationKey: key,
          barcode:
            'https://nl.m.vispaschecker.nl/' +
            this.licences.length +
            Math.floor(Math.random() * 100) +
            '',
          personFirstName: 'Jan',
          personLastName: 'Jansen',
          personResidence: 'Harskamp',
          personStreet: 'Irenelaan',
          personStreetNumber: ' 11A',
          personPostalCode: '6732BA',
          personGender: 'Man',
          personBirthDate: Date.now(),
        };
        this.algoliaLicenseService.addFishingLicense(tempFishingLicense);
        // this.licenseService.addFishingLicense(tempFishingLicense);
      })
      .catch((err) => console.log(err));
  }

  private unsubscribeAll() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
