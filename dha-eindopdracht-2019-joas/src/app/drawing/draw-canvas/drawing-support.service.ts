import { Injectable } from '@angular/core';

export interface PointerCoords {
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root',
})
export class DrawingSupportService {
  constructor() {}

  public scaleImageData(
    imageData: ImageData,
    width: number,
    algorithm?: string,
  ) {
    if (width > imageData.width) {
      return imageData;
    }

    algorithm = algorithm || 'nearest-neighbor';

    let resize;
    switch (algorithm) {
      case 'nearest-neighbor':
        resize = this.nearestNeighbor;
        break;
      // case 'biliniear-interpolation': resize = bilinearInterpolation; break
      default:
        throw new Error(`Unknown algorithm: ${algorithm}`);
    }

    const result = new ImageData(width, width);

    resize(imageData, result);

    return result;
  }

  public getDrawingFromCanvas(
    ctx: CanvasRenderingContext2D,
    drawingCoordinates: PointerCoords[],
  ): ImageData | null {
    // the minimum boudning box around the current drawing
    if (drawingCoordinates.length <= 0) {
      return null;
    }
    const mbb = this.getMinBox(drawingCoordinates);
    // cacluate the dpi of the current window
    const dpi = window.devicePixelRatio;
    // extract the image data
    const imgData = ctx.getImageData(
      mbb.min.x * dpi,
      mbb.min.y * dpi,
      (mbb.max.x - mbb.min.x) * dpi,
      (mbb.max.y - mbb.min.y) * dpi,
    );
    return imgData;
  }

  // get the best bounding box by finding the top left and bottom right cornders
  private getMinBox(coords: PointerCoords[]) {
    const coorX = coords.map(function(p) {
      return p.x;
    });
    const coorY = coords.map(function(p) {
      return p.y;
    });
    // find top left corner
    const min_coords = {
      x: Math.min.apply(null, coorX) - 4,
      y: Math.min.apply(null, coorY) - 4,
    };
    // find right bottom corner
    const max_coords = {
      x: Math.max.apply(null, coorX) + 4,
      y: Math.max.apply(null, coorY) + 4,
    };
    return {
      min: min_coords,
      max: max_coords,
    };
  }

  private nearestNeighbor(src, dst) {
    let pos = 0;

    for (let y = 0; y < dst.height; y++) {
      for (let x = 0; x < dst.width; x++) {
        const srcX = Math.floor((x * src.width) / dst.width);
        const srcY = Math.floor((y * src.height) / dst.height);

        let srcPos = (srcY * src.width + srcX) * 4;

        dst.data[pos++] = src.data[srcPos++]; // R
        dst.data[pos++] = src.data[srcPos++]; // G
        dst.data[pos++] = src.data[srcPos++]; // B
        dst.data[pos++] = src.data[srcPos++]; // A
      }
    }
  }
}
