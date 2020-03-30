import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SketchRnnRecognizeService } from '../shared/sketch-rnn-recognize.service';

@Component({
  selector: 'app-draw-task',
  templateUrl: './draw-task.component.html',
  styleUrls: ['./draw-task.component.scss'],
})
export class DrawTaskComponent implements OnInit {
  @Output()
  taskAccept = new EventEmitter();
  public task: string;
  public loading = true;

  constructor(private recognitionSerivce: SketchRnnRecognizeService) {}

  ngOnInit() {
    this.recognitionSerivce.status$.subscribe((status) => {
      if (status === this.recognitionSerivce.STATUS_TYPES.READY) {
        this.loading = false;
      }
    });
    this.recognitionSerivce.classNames.subscribe((names) => {
      if (names.length > 0) {
        const randomNumber = Math.floor(Math.random() * names.length);
        this.task = names[randomNumber];
      }
    });
  }

  taskAccepted() {
    this.taskAccept.emit(this.task);
  }
}
