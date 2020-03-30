import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  StoreImageData,
  DrawingStorageService,
} from 'src/app/core/drawing-storage.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  public drawings: Observable<StoreImageData[]>;

  constructor(private drawingStorage: DrawingStorageService) {}

  ngOnInit() {
    this.drawings = this.drawingStorage.loadDrawings();
  }

  delete(index: number) {
    console.log(`Delete drawing on ${index}`);
    this.drawingStorage.deleteDrawing(index);
  }

  // imageData: string;
  // saveDate: number;
  // correctGuess: boolean;
  // drawTask: string;
  // thumbnail: string;
}
