import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { from, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { combineLatest } from 'rxjs';

export interface PredictionModel {
  name: string;
  probability: number;
}

enum StatusEnum {
  LOADING,
  READY,
  RECOGNIZING,
}

@Injectable({
  providedIn: 'root',
})
export class SketchRnnRecognizeService {
  private sketchModel: tf.LayersModel;
  public classNames = new BehaviorSubject<string[]>([]);
  public topPrediction$ = new Subject<PredictionModel>();
  public status$ = new BehaviorSubject<StatusEnum>(StatusEnum.LOADING);
  public STATUS_TYPES = StatusEnum;

  // TODO: Add load notification, so listeners are aware of when the service is available.
  constructor(private http: HttpClient) {
    console.log('Created sketch rnn service');
    tf.setBackend('cpu');
    const loadModel = this.loadSketchModel(
      '../../assets/mlmodel/model.json',
    ); /*.subscribe(
      (model) => {
        this.sketchModel = model;
        // Warm up the model with a simple predict
        // TODO: Requires cleanup of tensors.
        const testTensor = tf.zeros([1, 28, 28, 1]);
        const pred = this.sketchModel.predict(testTensor) as tf.Tensor<tf.Rank>;
        pred.data().then((predict) => {
          console.log('numTensors (in then): ' + tf.memory().numTensors);
          testTensor.dispose();
        });
        pred.dispose();
      },
    );*/

    const loadClasses = this.loadClassNames(); /*.subscribe(
      (classnames: string) => {
        const nameArray = classnames.split(/\n/);
        const properlyStyledNames = nameArray.map((name) => {
          return name.replace('_', ' ');
        });
        this.classNames.next(properlyStyledNames);
      },
      (err) => console.log(err),
    );*/

    combineLatest(loadModel, loadClasses, (model, classes) => ({
      model,
      classes,
    })).subscribe(async (result) => {
      this.sketchModel = result.model;
      await this.warmupModel();
      this.classNames.next(this.convertToArray(result.classes));
      this.status$.next(StatusEnum.READY);
    });
  }

  private loadSketchModel(destination: string) {
    return from(tf.loadLayersModel(destination));
  }

  private async warmupModel() {
    const testTensor = tf.zeros([1, 28, 28, 1]);
    const pred = this.sketchModel.predict(testTensor) as tf.Tensor<tf.Rank>;
    await pred.data(); /* .then((predict) => {
      console.log('numTensors (in then): ' + tf.memory().numTensors);
      testTensor.dispose();
    }); */
    pred.dispose();
  }

  public async predictModel(imgData: ImageData) {
    const preprocessed = this.preprocess(imgData);
    const pred = this.sketchModel.predict(preprocessed) as tf.Tensor<tf.Rank>;
    const prediction = await pred.data(); // .then((predict) => {

    const indices = this.findIndicesOfMax(prediction, 5);
    const probs = this.findTopValues(prediction, 5);
    const names = this.getClassNames(indices);
    this.topPrediction$.next({ name: names[0], probability: probs[0] * 100 });
    preprocessed.dispose();
    pred.dispose();
    console.log('numTensors (in then): ' + tf.memory().numTensors);

    // });
  }

  public preprocess(imgData: ImageData) {
    return tf.tidy(() => {
      // // convert the image data to a tensor
      const tensor = tf.browser.fromPixels(imgData, 1);
      // Resize the tensor to the sizes that the model accepts
      const resized = tf.image.resizeBilinear(tensor, [28, 28]).toFloat();
      // Normalize the image for better prediction
      const offset = tf.scalar(255.0);
      const normalized = tf.scalar(1.0).sub(resized.div(offset));
      // Expand the dimension by adding one value at axis 0. This way it resembles the model.
      const batched = normalized.expandDims(0);
      console.log('numTensors (in tidy): ' + tf.memory().numTensors);
      return batched;
    });
  }

  public getTopPredictions() {
    return this.topPrediction$;
  }

  /*
  get indices of the top probs
  */
  private findIndicesOfMax(inp, count) {
    const outp: number[] = [];
    for (let i = 0; i < inp.length; i++) {
      outp.push(i); // add index to output array
      if (outp.length > count) {
        outp.sort(function(a, b) {
          return inp[b] - inp[a];
        }); // descending sort the output array
        outp.pop(); // remove the last index (index of smallest element in output array)
      }
    }
    return outp;
  }

  /*
  find the top n predictions
  */
  private findTopValues(inp, count) {
    const outp: number[] = [];
    const indices = this.findIndicesOfMax(inp, count);
    // show 5 greatest scores
    for (let i = 0; i < indices.length; i++) {
      outp[i] = inp[indices[i]];
    }
    return outp;
  }

  /*
  get the the class names
  */
  private getClassNames(indices) {
    const outp: string[] = [];
    for (let i = 0; i < indices.length; i++) {
      outp[i] = this.classNames.value[indices[i]];
    }
    return outp;
  }

  /*
  load the class names
  */
  private loadClassNames() {
    return this.http.get('../../assets/mlmodel/class_names.txt', {
      responseType: 'text',
    });
  }

  private convertToArray(classNames: string) {
    const nameArray = classNames.split(/\n/);
    const properlyStyledNames = nameArray.map((name) => {
      return name.replace('_', ' ');
    });
    return properlyStyledNames;
  }
}
