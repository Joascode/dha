import { InjectionToken } from '@angular/core'

export let APP_CONFIG = new InjectionToken<AppConfig>('app-config')

// Source: https://angular.io/guide/dependency-injection#non-class-dependencies
export interface AppConfig {
    apiEndpoint: string
    defaultText: string
    defaultLang: string
  }

export interface AppConfigWithSecret extends AppConfig {
    apiKey: string
}

// https://developers.google.com/apis-explorer/?hl=nl#p/translate/v2/language.translations.translate?_h=2&resource=%257B%250A++%2522q%2522%253A+%250A++%255B%2522the+world+is+your+oyster%2522%250A++%255D%252C%250A++%2522source%2522%253A+%2522en%2522%252C%250A++%2522format%2522%253A+%2522text%2522%252C%250A++%2522model%2522%253A+%2522%2522%252C%250A++%2522target%2522%253A+%2522nl%2522%250A%257D&
export const DI_CONFIG_DEFAULT: AppConfig = {
    // voorbeeld: 'https://translation.googleapis.com/language/translate/v2?key={YOUR_API_KEY}',
    apiEndpoint: 'https://translation.googleapis.com/language/translate/v2',
    defaultText: 'The world is your oyster.',
    defaultLang: 'nl',
};