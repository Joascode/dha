# Bouncing Balls - EcmaScript 2015
Bekijk de case van de 'Bouncing Balls' op MDN:
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice (*)

Dit was object georienteerd programmeren voordat TypeScript bestond. We gaan hier nu onze ES2015 'skills - zoals `class` en fat arrow functions - nu gebruiken.

Stap 1: Genereer een nieuwe blank app met
> ionic start dha-bouncing-Balls --no-git

Stap 2: Zet een canvas in de index.html en ook een <script> tag met src="bouncing-balls.js".
Maak deze 'bouncing-balls.js' files aan, en neem alle code blokken genoemd op MDN (*). De .js moet in de www folder. Waarom?)

Stap 3: Zorg dat je ook een resize van het window het canvas opnieuw goed instelt.
Gebruik hiervoor de oplossing met `setTimeOut` om op het 'resize' event te reageren.
https://developer.mozilla.org/en-US/docs/Web/Events/resize

Stap 4: Migreer je code naar de component van je 'Home' pagina (home.ts). Zet de code bijvoorbeeld binnen een lifecycle event. Zoek dit op in Ionic documentatie (ionViewDidLoad() onder navController.
Zet de <canvas> ook in de bijbehorende view/template van home.

Stap 5: We gaan nu upgraden naar ES6.
Zet in .tsConfig .tsLint onderstaande instellingen stapsgewijs wat strenger. Fix telkens de fouten
- only-arrow-functions .tsLint
- noImplicitAny (.tsConfig)
- no-magic-numbers (.tsLint)
- no-any (.tsLint)
- zet het om naar een class BouncingBalls
- maak van Ball een aparte class in een apart bestand/module die je importeert (https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Statements/export)

Zoek hierbij zo nodig in de documentatie op hoe de instelling werkt:
https://www.typescriptlang.org/docs/handbook/compiler-options.html
https://palantir.github.io/tslint/rules/

NB Bij veranderen van tslint of tsconfig moet je de linter opnieuw starten.
De watcher pikt wijzigingen in de config niet op, alleen die in .ts, .html en .sass bestanden
Dus je moet `ionic serve` afbreken (ctrl-C)en opnieuw runnen. Het makkelijkst is de serve in de terminal in je editor te runnen (Visual Studio Code -> View -> Output -> TERMINAL))
