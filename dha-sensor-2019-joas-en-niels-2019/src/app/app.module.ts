import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Firebase } from '@ionic-native/firebase/ngx';
import { environment } from '../environments/environment';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { DatePipe } from '@angular/common';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { Geolocation } from '@ionic-native/geolocation/ngx';

const config = {
  apiKey: 'AIzaSyA66guPlEIK4RjijZSXOI3pXfjcm33DNxk',
  authDomain: 'devispascheck.firebaseapp.com',
  databaseURL: 'https://devispascheck.firebaseio.com',
  projectId: 'devispascheck',
  storageBucket: 'devispascheck.appspot.com',
  messagingSenderId: '871219865074',
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    NgxQRCodeModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    DatePipe,
    AngularFirestore,
    QRScanner,
    StatusBar,
    Firebase,
    Geolocation,
    SplashScreen,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
