import { Injectable } from '@angular/core';
import { Subject, Observable, of, from, BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';

interface StatusModel {
  type: StatusEnum;
}

interface SaveStatusModel extends StatusModel {
  index?: number;
  error?: string;
}

export interface StoreImageData {
  imageData: string;
  saveDate: number;
  correctGuess: boolean;
  drawTask: string;
  thumbnail: string;
}

enum StatusEnum {
  loading,
  saving,
  success,
  error,
}

@Injectable({
  providedIn: 'root',
})
export class DrawingStorageService {
  public readonly saveStatus$ = new Subject<SaveStatusModel>();
  public readonly SAVE_STATUS = StatusEnum;

  private readonly _drawing$ = new BehaviorSubject<StoreImageData[]>([]);

  constructor(private storage: Storage) {}

  public saveDrawing(imageData: StoreImageData): Observable<number> {
    this.saveStatus$.next({ type: StatusEnum.saving });
    try {
      let index: number;
      this.storage
        .get('drawings')
        .then((drawings) => {
          let storedDrawings = JSON.parse(drawings);
          if (storedDrawings) {
            index = storedDrawings.length - 1;
          } else {
            storedDrawings = [];
            index = 0;
          }
          storedDrawings.push(imageData);
          this.storage.set('drawings', JSON.stringify(storedDrawings));
          this.saveStatus$.next({ type: StatusEnum.success, index });
        })
        .catch((err) => console.log(err));
      return of(index);
    } catch (err) {
      this.saveStatus$.next({ type: StatusEnum.error, error: err });
      throw Observable.throw(err);
    }
  }

  public loadDrawings() {
    console.log('Loading drawings');
    // return from(this.storage.get('drawings')).pipe<StoreImageData[]>(
    //   map((drawings) => {
    //     const storedDrawings = JSON.parse(drawings);
    //     console.log(storedDrawings);
    //     if (!storedDrawings) {
    //       return [];
    //     }
    //     return storedDrawings;
    //   }),
    // );
    this.storage.get('drawings')
      .then(
      (drawings: string) => {
        const storedDrawings = JSON.parse(drawings);
        console.log(storedDrawings);
        if (!storedDrawings) {
          this._drawing$.next([]);
        }
        this._drawing$.next(storedDrawings);
      });
    return this._drawing$;
  }

  public loadDrawing(index: number) {
    try {
      let drawing: StoreImageData;
      this.storage.get('drawings').then((drawings) => {
        const storedDrawings = JSON.parse(drawings);
        drawing = storedDrawings[index];
      });
      return of(drawing);
    } catch (err) {
      throw Observable.throw(err);
    }
  }

  public deleteDrawings() {
    from(this.storage.remove('drawings'));
  }

  public deleteDrawing(index: number) {
    try {
      this.storage.get('drawings').then((drawings) => {
        const storedDrawings = JSON.parse(drawings);
        const leftOverDrawings = storedDrawings.slice(index, 1);
        this.storage.set('drawings', JSON.stringify(leftOverDrawings));
        this._drawing$.next(leftOverDrawings);
      });
    } catch (err) {
      throw Observable.throw(err);
    }
  }
}
