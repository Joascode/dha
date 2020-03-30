import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  Renderer,
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { fromEvent, timer } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';
import {
  SketchRnnRecognizeService,
  PredictionModel,
} from 'src/app/drawing/shared/sketch-rnn-recognize.service';
import { Platform } from '@ionic/angular';
import { DrawingStorageService } from 'src/app/core/drawing-storage.service';
import {
  DrawingSupportService,
  PointerCoords,
} from './drawing-support.service';

@Component({
  selector: 'app-draw-canvas',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(0)', opacity: 0 }),
        animate('200ms', style({ transform: 'translateY(30px)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(30px)', opacity: 1 }),
        animate('200ms', style({ transform: 'translateY(0%)', opacity: 0 })),
      ]),
    ]),
  ],
  templateUrl: './draw-canvas.component.html',
  styleUrls: ['./draw-canvas.component.scss'],
})
export class DrawCanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('canvasContainer') cc: ElementRef;
  @Input() task: string;
  @Output() drawEnd = new EventEmitter();

  private canvasContext: CanvasRenderingContext2D;
  private drawingCoords: PointerCoords[] = [];
  public label: string;
  public success = false;

  private backgrondColor = 'white'; // 'rgb(237, 231, 221)';
  private brushColor = 'black';
  private lineStyle: CanvasLineJoin = 'round';
  private brushSize = 8;

  private coordsAreUpdated = false;

  private startRecognizingTimer = timer(0, 1500);
  public timeLeftTimer = timer(0, 1000);
  public timeLeft = 20;
  public gameClosed = false;

  constructor(
    private recognitionService: SketchRnnRecognizeService,
    private drawingStorageService: DrawingStorageService,
    private drawingSupportService: DrawingSupportService,
    private platform: Platform,
    private renderer: Renderer,
  ) {}

  ngOnInit() {
    this.recognitionService.getTopPredictions().subscribe(
      (prediction) => {
        if (!this.success) {
          this.label = this.createLabel(prediction);
        }
        if (this.isSuccessful(prediction)) {
          this.success = true;
          this.closeGame();
        }
      },
      (err) => console.log(err),
    );
  }

  ngAfterViewInit() {
    const canvasElement = this.canvas.nativeElement;
    // setTimeout(() => {
    console.log(this.cc);
    this.canvasContext = canvasElement.getContext('2d');
    this.resizeCanvas(this.canvasContext, this.cc.nativeElement);
    console.log(canvasElement);
    console.log(canvasElement);
    // this.renderer.setElementAttribute(canvasElement, 'width', '400px');
    // this.renderer.setElementAttribute(canvasElement, 'height', '600px');
    // this.renderer.setElementAttribute(
    //   this.canvasContext.canvas,
    //   'width',
    //   this.canvasContext.canvas.width + '',
    // );
    // this.renderer.setElementAttribute(
    //   this.canvasContext.canvas,
    //   'height',
    //   this.canvasContext.canvas.height + '',
    // );

    this.canvasContext.fillStyle = this.backgrondColor;
    this.canvasContext.strokeStyle = this.brushColor;
    this.canvasContext.lineWidth = this.brushSize;
    this.canvasContext.lineJoin = this.lineStyle;
    this.canvasContext.fillRect(
      0,
      0,
      this.canvasContext.canvas.width,
      this.canvasContext.canvas.height,
    );
    if (this.platform.is('cordova')) {
      this.captureTouchEvents(this.canvasContext.canvas);
    } else {
      this.captureMouseEvents(this.canvasContext.canvas);
    }
    // this.captureEvents(canvasElement);
    console.log('Resizing canvas');
    // }, 0);

    this.startRecognizingTimer.subscribe(() => {
      this.recognizeDrawing();
    });
    this.timeLeftTimer.subscribe(() => {
      if (this.timeLeft > 0 && this.success === false) {
        this.timeLeft--;
      } else {
        if (!this.gameClosed) {
          const drawing = this.drawingSupportService.getDrawingFromCanvas(
            this.canvasContext,
            this.drawingCoords,
          );
          if (drawing) {
            this.saveImage(drawing);
          }
          console.log('timer ticking');
          this.closeGame();
          this.gameClosed = true;
        }
      }
    });
  }

  resizeCanvas(canvasContext, parent) {
    // Lookup the size the browser is displaying the canvas.
    const displayWidth = this.canvasContext.canvas.clientWidth; // parent.offsetWidth - 100;
    const displayHeight = this.canvasContext.canvas.clientHeight; // parent.offsetHeight - 90;
    console.log(displayWidth);
    console.log(displayHeight);
    // Check if the canvas is not the same size.
    if (
      this.canvasContext.canvas.width !== displayWidth ||
      this.canvasContext.canvas.height !== displayHeight
    ) {
      // Make the canvas the same size
      this.renderer.setElementAttribute(
        this.canvasContext.canvas,
        'width',
        displayWidth + 'px',
      );
      this.renderer.setElementAttribute(
        this.canvasContext.canvas,
        'height',
        displayHeight + 'px',
      );
    }
    console.log(this.canvasContext.canvas.width);
    console.log(this.canvasContext.canvas.height);
  }

  recognizeDrawing() {
    if (this.coordsAreUpdated) {
      const imgData = this.drawingSupportService.getDrawingFromCanvas(
        this.canvasContext,
        this.drawingCoords,
      );

      this.recognitionService.predictModel(imgData);
      this.coordsAreUpdated = false;
    }
  }

  private createLabel(prediction: PredictionModel) {
    let label = '';
    if (prediction.name === this.task && prediction.probability > 60) {
      label = `Oh, I know! It's a ${prediction.name}!`;
    } else if (
      prediction.name === this.task &&
      prediction.probability > 40 &&
      prediction.probability <= 60
    ) {
      label = 'Argh, I know this!';
    } else if (prediction.name !== this.task && prediction.probability > 60) {
      label = `Is it a ${prediction.name}?`;
    } else if (
      prediction.name !== this.task &&
      prediction.probability > 40 &&
      prediction.probability <= 60
    ) {
      label = `Hmmm.. Looks like a ${prediction.name}.`;
    } else {
      label = `I don't got a clue what this is..`;
    }
    return label;
  }

  private isSuccessful(prediction: PredictionModel) {
    return prediction.name === this.task && prediction.probability > 60;
  }

  public closeGame() {
    setTimeout(() => {
      this.drawEnd.emit();
    }, 3000);
    this.canvasContext.canvas.style.pointerEvents = 'none';
  }

  private saveImage(image: ImageData | null) {
    console.log('Saving Image');
    if (image) {
      const croppedImage = this.drawingSupportService.scaleImageData(image, 50);
      this.drawingStorageService.saveDrawing({
        imageData: this.convertToDataUrl(image),
        drawTask: this.task,
        saveDate: Date.now(),
        correctGuess: this.success,
        thumbnail: this.convertToDataUrl(croppedImage),
      });
    }
  }

  private convertToDataUrl(image: ImageData) {
    const convertCanvas = document.createElement('canvas');
    convertCanvas.width = image.width;
    convertCanvas.height = image.height;
    const ctx = convertCanvas.getContext('2d');
    ctx.putImageData(image, 0, 0);
    return convertCanvas.toDataURL('image/png');
  }

  private captureMouseEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from the canvas element
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove').pipe(
            // we'll stop (and unsubscribe) once the user releases the mouse
            // this will trigger a 'mouseup' event
            takeUntil(fromEvent(canvasEl, 'mouseup')),
            // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
            takeUntil(fromEvent(canvasEl, 'mouseleave')),
            // pairwise lets us get the previous value to draw a line from
            // the previous point to the current point
            pairwise(),
          );
        }),
      )
      .subscribe(
        (res: [MouseEvent, MouseEvent]) => {
          console.log('Mousing');
          try {
            const rect = canvasEl.getBoundingClientRect();
            // previous and current position with the offset

            const prevPos = {
              x: res[0].clientX - rect.left,
              y: res[0].clientY - rect.top,
            };

            const currentPos = {
              x: res[1].clientX - rect.left,
              y: res[1].clientY - rect.top,
            };

            this.drawingCoords.push(currentPos);
            this.coordsAreUpdated = true;

            // this method we'll implement soon to do the actual drawing
            this.drawOnCanvas(prevPos, currentPos);
          } catch (err) {
            console.log('Error occured');
            console.log(err);
          }
        },
        (err) => console.log(err),
      );
  }

  private captureTouchEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from the canvas element
    fromEvent(canvasEl, 'touchstart')
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'touchmove').pipe(
            // we'll stop (and unsubscribe) once the user releases the mouse
            // this will trigger a 'mouseup' event
            takeUntil(fromEvent(canvasEl, 'touchend')),
            // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
            // takeUntil(fromEvent(canvasEl, 'mouseleave')),
            // pairwise lets us get the previous value to draw a line from
            // the previous point to the current point
            pairwise(),
          );
        }),
      )
      .subscribe(
        (res: [TouchEvent, TouchEvent]) => {
          console.log('Touching');
          try {
            const rect = canvasEl.getBoundingClientRect();
            // previous and current position with the offset
            const prevPos = {
              x: res[0].touches[0].pageX - rect.left,
              y: res[0].touches[0].pageY - rect.top,
            };

            const currentPos = {
              x: res[1].touches[0].pageX - rect.left,
              y: res[1].touches[0].pageY - rect.top,
            };

            this.drawingCoords.push(currentPos);
            this.coordsAreUpdated = true;

            // this method we'll implement soon to do the actual drawing
            this.drawOnCanvas(prevPos, currentPos);
          } catch (err) {
            console.log('Error occured');
            console.log(err);
          }
        },
        (err) => console.log(err),
      );
  }

  private drawOnCanvas(
    prevPos: { x: number; y: number },
    currentPos: { x: number; y: number },
  ) {
    if (!this.canvasContext) {
      return;
    }

    this.canvasContext.beginPath();

    if (currentPos.x > this.canvasContext.canvas.width) {
      currentPos.x = this.canvasContext.canvas.width;
    }
    if (currentPos.y > this.canvasContext.canvas.height) {
      currentPos.y = this.canvasContext.canvas.height;
    }
    if (prevPos) {
      this.canvasContext.moveTo(prevPos.x, prevPos.y); // from
      this.canvasContext.lineTo(currentPos.x, currentPos.y);
      this.canvasContext.closePath();
      this.canvasContext.stroke();
    }
  }

  // TODO: Refactor for proper use of canvas reference.
  clearCanvas() {
    this.canvasContext.clearRect(
      0,
      0,
      this.canvasContext.canvas.width,
      this.canvasContext.canvas.height,
    );
    this.timeLeft = 20;
    this.canvasContext.fillRect(
      0,
      0,
      this.canvasContext.canvas.width,
      this.canvasContext.canvas.height,
    );
    this.canvasContext.beginPath();
    this.drawingCoords = [];
  }
}
