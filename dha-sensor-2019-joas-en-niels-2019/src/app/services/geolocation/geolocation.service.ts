import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  GeoCollectionReference,
  GeoFirestore,
  GeoQuery,
  GeoQuerySnapshot,
} from 'geofirestore';
import * as firebase from 'firebase/app';
import { Geokit, LatLngLiteral } from 'geokit';
import { GeoPoint } from '@firebase/firestore-types';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  private readonly collectionReference: string = 'locations';
  private readonly geofirestore: GeoCollectionReference;
  private readonly geolocation$: Observable<Geoposition>;
  private query: GeoQuery;

  constructor(private db: AngularFirestore, private geolocation: Geolocation) {
    console.log(
      new GeoFirestore(this.db.firestore).collection(this.collectionReference),
    );
    this.geofirestore = new GeoFirestore(this.db.firestore).collection(
      this.collectionReference,
    );
    this.setNewLocation(
      'another_test',
      new firebase.firestore.GeoPoint(5.23, 86.13),
    );
    this.query = this.geofirestore.near({
      center: new firebase.firestore.GeoPoint(40.7589, -73.9851),
      radius: 10,
    });

    // this.geolocation.watchPosition()
  }

  public setNewLocation(name: string, location: firebase.firestore.GeoPoint) {
    const key = this.generateFirestoreGeoHash(
      location.latitude,
      location.longitude,
    );
    console.log(key);
    const newLocation = {
      lat: Number(location.latitude.toFixed(8)),
      lng: Number(location.longitude.toFixed(8)),
    };
    return this.geofirestore
      .doc(key)
      .get()
      .then((snapshot) => {
        let document = snapshot.data();
        if (!document) {
          document = {
            name: name,
            count: 1,
            coordinates: new firebase.firestore.GeoPoint(
              newLocation.lat,
              newLocation.lng,
            ),
          };
          console.log(
            'Provided key is not in Firestore, adding document: ',
            JSON.stringify(document),
          );
          this.setInFirestore(key, document);
        } else {
          document.count++;
          console.log(
            'Provided key is in Firestore, updating document: ',
            JSON.stringify(document),
          );
          this.setInFirestore(key, document);
        }
        return key;
      });
    // .catch((err) => console.log(`Error on location saving: ${err}`));
  }

  public generateFirestoreGeoHash(lat: number, long: number) {
    const newLocation = {
      lat: Number(lat.toFixed(8)),
      lng: Number(long.toFixed(8)),
    };
    return Geokit.hash(newLocation);
  }

  public setInFirestore(
    hash: string,
    document: {
      [field: string]: any;
      coordinates?: FirebaseFirestore.GeoPoint | GeoPoint;
    },
  ) {
    this.geofirestore
      .doc(hash)
      .set(document)
      .then(() => {
        console.log('Provided key has been added to GeoFire');
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  public updateGeolocationQuery(lat: number, long: number) {
    const newlat = Number(lat.toFixed(13));
    const newlong = Number(long.toFixed(13));
    console.log(this.query);
    this.query = this.query.near({
      center: new firebase.firestore.GeoPoint(newlat, newlong),
      radius: 1,
    });
    console.log(this.query);
    // Get query (as Promise)
  }

  public startGeolocationScanning(cb: (values: GeoQuerySnapshot) => void) {
    this.query.get().then((value: GeoQuerySnapshot) => {
      console.log(value.docs); // All docs returned by GeoQuery
      cb(value);
    });
  }
}
