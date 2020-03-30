import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'

import { JsonpModule } from '@angular/http'


// Source: https://angular.io/guide/http#httpclient
import {HttpClientModule} from '@angular/common/http'

import { MyApp } from './app.component'
import { HomePage } from '../pages/home/home'

import { APP_CONFIG_SECRET, DI_CONFIG_SECRET } from './app-config-keys'

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JsonpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: APP_CONFIG_SECRET, useValue: DI_CONFIG_SECRET },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
