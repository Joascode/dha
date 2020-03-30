import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawCanvasComponent } from './draw-canvas/draw-canvas.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DrawTaskComponent } from './draw-task/draw-task.component';
import { DrawComponent } from './draw.component';
import { SketchRnnRecognizeService } from './shared/sketch-rnn-recognize.service';

@NgModule({
  declarations: [DrawComponent, DrawCanvasComponent, DrawTaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: DrawComponent,
      },
    ]),
    SharedModule,
  ],
})
export class DrawModule {
  constructor(@Optional() @SkipSelf() parentModule: DrawModule) {
    if (parentModule) {
      throw new Error(
        'DrawModule is already loaded. Import it in the AppModule only',
      );
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DrawModule,
      providers: [SketchRnnRecognizeService],
    };
  }
}
