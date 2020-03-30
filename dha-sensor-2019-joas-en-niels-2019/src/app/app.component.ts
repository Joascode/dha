import {Component} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(public storage: Storage,
              private navCtrl: NavController,
              private platform: Platform,
              private splashScreen: SplashScreen,
              private statusBar: StatusBar) {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.storage.get('introShown').then((result) => {
          if (!result) {
            this.navCtrl.navigateForward('/home');
            this.storage.set('introShown', true);
          }
        });
    });

  }
}
