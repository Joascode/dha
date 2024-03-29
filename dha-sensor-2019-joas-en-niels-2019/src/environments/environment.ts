// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import * as firebase from 'firebase';

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyA66guPlEIK4RjijZSXOI3pXfjcm33DNxk',
    authDomain: 'devispascheck.firebaseapp.com',
    databaseURL: 'https://devispascheck.firebaseio.com',
    projectId: 'devispascheck',
    storageBucket: 'devispascheck.appspot.com',
    messagingSenderId: '871219865074'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
