import { Component, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Jsonp } from '@angular/http'

import 'rxjs'

import { NavController } from 'ionic-angular'

import { AppConfigWithSecret } from '../../app/app-config'
import { APP_CONFIG_SECRET } from '../../app/app-config-keys'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  request: TranslateRequest;
  // We gebruiken spinnen totdat veld vertaald is.
  // Bron: http://ionicframework.com/docs/v1/nightly/api/directive/ionSpinner/
  isTranslating: boolean
  tekst: string = 'test'
  inputTekst: string = 'The world is your oyster.'
  outputTekst: string
  taal: string
  apiUrl: string
  error: string
  constructor(
    @Inject(APP_CONFIG_SECRET) private config: AppConfigWithSecret,
    public navCtrl: NavController,
    public http: HttpClient,
    private jsonp: Jsonp
  ) {
      this.taal = 'nl' // config.defaultLang
      this.apiUrl = `${this.config.apiEndpoint}?key=${this.config.apiKey}`
      this.isTranslating = false
  }

  ionViewDidLoad() {
    this.inputTekst = this.config.defaultText // The world is your oyster.
  }

  zoek(term: string) {
      var search = new URLSearchParams()
      search.set('action', 'opensearch');
      search.set('search', term);
      search.set('format', 'json');
      return this.jsonp
                  .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
                  .toPromise()
                  .then((response) => response.json()[1])
    }
  
  vertaal() {
    if (!this.isTranslating) {
      this.isTranslating = true
      if (this.inputTekst) {
        setTimeout(() => {
          if (!this.request || this.inputTekst!==this.request.q) {
            this.request = new TranslateRequest(this.inputTekst)
          }
          this.http.post<TranslateResponse>(this.apiUrl, this.request).distinctUntilChanged().debounceTime(2000).subscribe(result => {
            if (result && result.data && result.data.translations && result.data.translations[0]
              && result.data.translations[0].translatedText) {
              this.outputTekst = result.data.translations[0].translatedText
            } else {
             this.error = "Onverwacht resultaat"
            }
            this.isTranslating = false
          });
        }, 1000)
      }
    }
  }
}

class TranslateRequest {
  
  constructor(
    public q: string | Array<string>,
    public source: string = "en",
    public format: string = "text",
    public target: string = "nl"
  ) {
    if (typeof q === "string" && q.includes(",")) {
      q = q.split(',')
      q = q.map((word) => word.trim())
    }
  }
}

class TranslateResponse {
  data: any
}
//   constructor(
//     public q: Array<string>,
//     public source: string = "en",
//     public format: string = "text",
//     public target: string = "nl"
//   ) {
//     // Evt. nog iets doen hier.
//   }
// }


