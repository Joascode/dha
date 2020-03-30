import { Component, AfterViewInit, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DrawingStorageService } from './core/drawing-storage.service';
import { trigger, transition, style, animate } from '@angular/animations';
import {
  Observable,
  merge,
  interval,
  timer,
  fromEvent,
  Subject,
  Subscription,
} from 'rxjs';
import { takeUntil, switchMap, mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(50%)', opacity: 0 }),
        animate('200ms', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('200ms', style({ transform: 'translateY(50%)', opacity: 0 })),
      ]),
    ]),
  ],
  styleUrls: ['app.component.scss'],
  templateUrl: 'app.component.html',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  public drawingSavingStatusLabel = '';
  public isPopupVisible = false;
  public popupStatus: string;
  private popupTimer = new Subject();
  private timerSub: Subscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private drawingStorageService: DrawingStorageService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.drawingStorageService.deleteDrawings();
    });
  }

  ngAfterViewInit() {
    this.timerSub = this.popupTimer
      .pipe(
        // switchMap(val => interval(3000).pipe(mapTo('Hello, I made it!')))
        switchMap((val) => interval(3000)),
      )
      .subscribe(() => (this.isPopupVisible = false));

    this.drawingStorageService.saveStatus$.subscribe((status) => {
      this.isPopupVisible = true;
      if (status.type === this.drawingStorageService.SAVE_STATUS.saving) {
        this.drawingSavingStatusLabel = 'Saving image...';
        this.popupStatus = 'default';
      }
      if (status.type === this.drawingStorageService.SAVE_STATUS.success) {
        this.drawingSavingStatusLabel = 'Image saved!';
        this.popupStatus = 'success';
        this.popupTimer.next();
      }
      if (status.type === this.drawingStorageService.SAVE_STATUS.error) {
        this.drawingSavingStatusLabel = 'Could not save image.';
        this.popupStatus = 'error';
      }
    });
  }

  ngOnDestroy() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
  }

  closePopup() {
    this.isPopupVisible = false;
  }
}
