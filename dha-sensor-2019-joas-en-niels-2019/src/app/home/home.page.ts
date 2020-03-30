import { Component } from '@angular/core';

import {LoadingController, NavController, Platform} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOpts = {
    effect: 'flip'
  };
  constructor(public navCtrl: NavController) {
  }

  goToHome() {
    this.navCtrl.navigateRoot('/overview');
  }
}
