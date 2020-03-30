import { Injectable } from '@angular/core';
// var algoliasearch = require('algoliasearch');
// var algoliasearch = require('algoliasearch/reactnative');
// var algoliasearch = require('algoliasearch/lite');
import * as algoliasearch from 'algoliasearch'; // When using TypeScript
import {
  FishingLicense,
  QRCode,
} from '../fishinglicense/fishing-license.service';
import { Subject, BehaviorSubject } from 'rxjs';

// or just use algoliasearch if you are using a <script> tag
// if you are using AMD module loader, algoliasearch will not be defined in window,
// but in the AMD modules of the page

@Injectable({
  providedIn: 'root',
})
export class AlgoliaFishingLicenseService {
  private readonly client = algoliasearch(
    'O3I1BA02NJ',
    'ac2493076cd8091cd9fe97307804f96d',
  );
  private readonly index = this.client.initIndex('fishinglicenseID');
  public algoliaResult$ = new BehaviorSubject<FishingLicense[]>([]);
  private tempBrowseResults = new Array<any>();

  constructor() {
    this.index.setSettings({
      attributesForFaceting: [
        'locationKey', // or 'filterOnly(brand)' for filtering purposes only
      ],
    });
  }

  addFishingLicense(license: FishingLicense) {
    this.index.addObject(license, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(res);
    });
  }

  findFishingLicenseById(id: string) {
    this.index.getObject(id, (err, res) => {
      if (err) {
        console.log(`Error during fetch: ${err}`);
      } else {
        console.log(res);
      }
    });
  }

  findAllFishingLicenses() {
    const browse = this.index.browseAll();
    browse.on('result', (content) => {
      console.log(content.hits);
      this.tempBrowseResults.push(...content.hits);
      console.log(this.tempBrowseResults);
    });
    browse.on('end', () => {
      console.log('Ending fetching all licenses.');
      this.algoliaResult$.next(this.tempBrowseResults);
    });
  }

  findMultipleFishingLicenses(ids: string[]) {
    let filterString = '';
    ids.forEach((id, index) => {
      if (index + 1 === ids.length) {
        filterString += 'locationKey: "' + id + '"';
      } else {
        filterString += 'locationKey: "' + id + '" OR ';
      }
    });
    console.log(filterString);
    this.index.search(
      {
        filters: filterString,
      },
      (err, res) => {
        if (err) {
          console.log(`Error during fetch: ${err}`);
        } else {
          console.log(res.hits);
          this.algoliaResult$.next(res.hits);
        }
      },
    );
  }
}
