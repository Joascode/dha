import { CUSTOM_ELEMENTS_SCHEMA, Renderer, Component } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import * as tf from '@tensorflow/tfjs';
import { DrawCanvasComponent } from './draw-canvas.component';
import { SketchRnnRecognizeService } from '../shared/sketch-rnn-recognize.service';
import { DrawingStorageService } from 'src/app/core/drawing-storage.service';
import { Platform } from '@ionic/angular';
import { DrawingSupportService } from './drawing-support.service';
import { of, asyncScheduler } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { fakeSchedulers } from 'rxjs-marbles/jasmine/angular';
import { By } from '@angular/platform-browser';

describe('DrawCanvasComponent', () => {
  let component: DrawCanvasComponent;
  let fixture: ComponentFixture<DrawCanvasComponent>;
  let sketchRnnRecognizeSpy,
    drawingStorageServiceSpy,
    platformReadySpy,
    platformSpy,
    drawingSupportServiceSpy,
    rendererSpy;

  beforeEach(async(() => {
    sketchRnnRecognizeSpy = jasmine.createSpyObj('SketchRnnRecognizeService', {
      getTopPredictions: of({ name: 'test', probability: 100 }),
      predictModel: () => {},
      preprocess: () => tf.zeros([1, 28, 28, 1]),
    });
    drawingStorageServiceSpy = jasmine.createSpyObj('DrawingStorageService', [
      'saveDrawing',
      'loadDrawings',
      'loadDrawing',
      'deleteDrawings',
      'deleteDrawing',
    ]);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', {
      ready: platformReadySpy,
      is: false,
    });
    drawingSupportServiceSpy = jasmine.createSpyObj('DrawingSupportService', [
      'scaleImageData',
      'getDrawingFromCanvas',
    ]);
    rendererSpy = jasmine.createSpyObj('Renderer', ['setElementAttribute']);

    TestBed.configureTestingModule({
      declarations: [DrawCanvasComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: SketchRnnRecognizeService, useValue: sketchRnnRecognizeSpy },
        { provide: DrawingStorageService, useValue: drawingStorageServiceSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: Renderer, useValue: rendererSpy },
        { provide: DrawingSupportService, useValue: drawingSupportServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the task to draw #Draw: Test', () => {
    component.task = 'test';
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.task-label')).nativeElement.innerText,
    ).toEqual('Draw: Test');
  });

  it('should show a timer', () => {
    expect(
      fixture.debugElement.query(By.css('#countdown-number')).nativeElement
        .innerText,
    ).toEqual('20');
  });

  it('should show a label with > 60 probability', () => {
    expect(
      fixture.debugElement.query(By.css('.label p')).nativeElement.innerText,
    ).toEqual('Is it a test?');
  });

  it(
    'should end drawing after the timer ends',
    fakeSchedulers(() => {
      // https://blog.angularindepth.com/rxjs-testing-with-fake-time-94114271eed2
      const endGame = spyOn(component, 'closeGame');
      const timer = spyOn(component, 'timeLeftTimer');
      component.timeLeft = 0;
      fixture.detectChanges();
      fixture.detectChanges();
      component.timeLeft = 0;
      tick(10000);
      // setTimeout(() => {
      expect(timer).toHaveBeenCalled();
      expect(endGame).toHaveBeenCalled();
      // }, 2000);
      tick(2000);
      fixture.detectChanges();

      fixture.detectChanges();
    }),
  );
});
