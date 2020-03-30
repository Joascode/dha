import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss'],
})
export class DrawComponent implements OnInit {
  public task: string;

  constructor() {}

  ngOnInit() {}

  public taskSelected(task: string) {
    this.task = task;
  }

  public stopDrawing() {
    this.task = '';
  }
}
