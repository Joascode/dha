import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class FishingLicenseService {
  private readonly collectionReference: string = 'licenses';
  private readonly fishingLicenses: Observable<FishingLicense[]>;
  private fishingLicenseCollection: AngularFirestoreCollection<FishingLicense>;

  constructor(db: AngularFirestore) {
    this.fishingLicenseCollection = db.collection<FishingLicense>(
      this.collectionReference,
    );

    this.fishingLicenses = this.fishingLicenseCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }),
    );
  }

  validateFishingLicenseByBarcode(scannedQRCode: string) {
    const licenseSub = this.getFishingLicenseByBarcode(scannedQRCode).subscribe(
      (fishingLicense) => {
        fishingLicense.validation_date = Date.now();
        this.updateFishingLicense(fishingLicense, fishingLicense.id).then(
          () => {
            licenseSub.unsubscribe();
          },
        );
      },
    );
  }

  getFishingLicenseByBarcode(barcode): Observable<FishingLicense> {
    return this.fishingLicenses.pipe(
      map((licenses) => {
        const result = licenses.filter(
          (license) => license.barcode === barcode,
        );
        return result.length > 0 ? result[0] : null;
      }),
    );
  }

  getFishingLicenseQRCodes(): Observable<QRCode[]> {
    return this.fishingLicenses.pipe(
      map((licenses) => {
        return licenses.map(
          (license) =>
            new class implements QRCode {
              code = license.barcode;
              validation_date = license.validation_date;
            }(),
        );
      }),
    );
  }
  getFishingLicenses() {
    return this.fishingLicenses;
  }

  getFishingLicensesByLocation(locationKeys: [string]) {}

  getFishingLicenseById(id) {
    return this.fishingLicenseCollection.doc<FishingLicense>(id).valueChanges();
  }

  updateFishingLicense(fishingLicense: FishingLicense, id: string) {
    return this.fishingLicenseCollection.doc(id).update(fishingLicense);
  }

  addFishingLicense(fishingLicense: FishingLicense) {
    return this.fishingLicenseCollection.add(fishingLicense);
  }

  removeFishingLicenses(id) {
    return this.fishingLicenseCollection.doc(id).delete();
  }
}

export interface QRCode {
  code: string;
  validation_date?: number;
}

export interface FishingLicense {
  id?: string;
  name: string;
  zone: string;
  locationKey: string;
  barcode: string;
  validation_date?: number;
  createdAt: number;
  personFirstName?: string;
  personLastName?: string;
  personResidence?: string;
  personStreet?: string;
  personStreetNumber?: string;
  personPostalCode?: string;
  personBirthDate?: number;
  personGender?: string;
}
