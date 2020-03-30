# TypeScript 101
We gaan in deze korte tutorial:

1. een node project starten
2. de TypeScript compiler installeren
3. TypeScript hello world schrijven (evt. linten)
4. een npm script schrijven
5. TypeScript command line programma schrijven
6. tsconfig.json goed instellen
7. ... en dan verder naar de browser

## 1. start project
Open je terminal en maak een nieuwe folder aan. Start hierna een npm project start:
```bash
mkdir typescript-101
cd typescript-101
npm init -y
```

Bekijk de `package.json` met je favoriete editor.

:information_source: Tip 1: Het `npm init` maakt van huidige folder een (lokale) npm project, waar je dependencies kunt toevoegen. De `-y` flag zorgt ervoor dat je defaults accepteert, zoals huidige folder-naam als package name. Voor een echt project kun je deze beter handmatig vullen; gebruik dan een 'kale' `npm init`.

:information_source: Tip 2: Installeer [Visual Studio Code](https://code.visualstudio.com/) en start hem in huidige folder  `code .`)

:information_source: Tip 3: Maak van de folder ook een (lokale) git repo (via `git init`, `git add -A`, `git commit -m "Initial commit."`). Zo kun je ook wijzigingen - zoals bij stap 2 zodirect - makkelijk zien (VS Code heeft hiervoor ook git support). Voeg hierbij wel een goede `.gitignore` toe ([deze](https://github.com/github/gitignore/blob/master/Node.gitignore)).

## 2. installeer de compiler
Om de TypeScript compiler te installeren heb je het npm pakket: `typescript` nodig. Die kan je globaal installeren zodat je van elke willekeurige plek: `tsc mijn_ts_file.ts` kan draaien. Je kunt hem ook installeren als een `devDependency` in je project, zodat deze alleen lokaal beschikbaar is:

```bash
# lokaal:
npm install typescript --save-dev
# globaal:
npm install typescript -g
```

Bij de eerste optie (lokaal) zul je zien dat de `package.json` ook gewijzigd is.

## 3. TypeScript hello world
Om in TypeScript een 'Hello, World' programma te schrijven is niet veel anders nodig dan een js hello world.

Dit volgende bestand wordt in het voorbeeld `hello-world.ts` genoemd

```ts
console.log('hello world')
```

Als je TypeScript globaal hebt geinstalleerd dan kan je nu het volgende commando draaien:

```bash
# voor een lokale installatie
./node_modules/.bin/tsc hello-world.ts
# voor een globale installatie
tsc hello-world.ts
```

Als het goed is verschijnt er nu in dezelfde folder een `hello-world.js` die niets anders is dan het `.ts` bestand.

:information_source: Als je geen globale install hebt of wilt, is de moderne variant om je lokale `tsc` versie te gebruiken (de `devDependency`) door [`npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) te gebruiken (beschikbaar per sinds Node 5.2.0): 

```bash
npx tsc hello-world.ts
```

Voordeel hiervan is dat je per project een andere typescript versie kunt gebruiken. Zo wordt je niet verrast door eventuele 'breaking changes' in die 'coole nieuwe versie'.

## 3b. Optionele stap: Gebruik tslint
Tip: Gebruik evt. (net als Ionic) ook 'tslint' tool voor code validatie en consistente code style (check). Installeer hiervoor tslint, genereer een `tslint.json` config bestand en voer dan de linter uit met de volgende commando's ([via de documentatie van developer 'Palantir' documentatie](https://palantir.github.io/tslint/usage/cli/) te vinden.

```bash
npm install tslint typescript --save-dev
npx tslint --init
npx tslint *.ts
```

In de voorbeeld code staan geen `;` scheidingsteken achter statements en deze gebruikt enkele quotes `'` voor strings i.p.v. de standaard dubbele `"`. Om codeer stijl goed te keuren en verder te volgen/checken voeg je in de `rules` property twee regels toe zodat dit wordt:
```
    "rules": {
        "semicolon": [true, "never"],
        "quotemark": [true, "single", "avoid-escape", "avoid-template"]    
    },
```

## 4. NPM script maken
Zo'n lang commando om te compileren is vervelend. Dus open de `package.json` en pas het `"scripts"` stukje aan:

```json
// oude package.json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
// nieuwe package.json
  "scripts": {
    "start": "tsc helloworld.ts && node helloworld.js"
  },
```

Nu kan je `npm start` draaien en de code wordt getranspileerd en daarna gerund in Node.

:information_source: De `&&` operator in het `"start"` commando zorgt ervoor dat beide commando's uitgevoerd worden (dit werkt zowel in OS X/Linux als [Windows](https://superuser.com/questions/464109/replacements-for-ampersand-and-double-ampersand-in-powershell)).
:information_source: Merk op dat je in scripts sectie van `package.json` niet ook `npx` hoeft te gebruiken. Als je runt (of eigenlijk werkt deze in de `node_modules/.bin` folder).

## 5. Command line TypeScript programma schrijven
Het vorige programma is natuurlijk heel saai en niets anders dan gewoon JavaScript. Probeer het volgende:

```ts
// Classes in TypeScript
class HelloWorld {
  greet() {
    let name = this.getArg('--name') || 'World'
    console.log(`Hello ${name}`)
  }

  // types in TS! --> String
  getArg (argName:string) : string {
    // dit gegoochel, haalt de argumenten op de command line op.
    let argNo = process.argv.indexOf(argName)
    if (argNo < 0) {
      return undefined
    }
    return process.argv[argNo + 1]
  }
}

let hw = new HelloWorld()
hw.greet()
```

En run nu: `npm start -- --name Fritz`

## 6. Een tsconfig.json maken en instellen
Wellicht geeft je editor of de tsc compiler bij stap 5 nog problemen (of warnings) op de plekken waar `process` staat.
Dit is namelijk een node specifiek commando/keyword. Dit kun je fixen door in de TypeScript configuratie op te geven dat je voor een Node omgeving werkt. Die configuratie staat - natuurlijk - ook weer in een .json bestand: `tsconfig.json`

Die hoeven we gelukkig niet zelf te schrijven, maar we draaien:
```bash
# globaal
tsc --init

# lokaal
./node_modules/.bin/tsc --init
```

En we installeren nog de types voor een node process:
```bash
npm install --save-dev @types/node
```

Dan zoeken we het kopje `"types"` op en voegen daar het volgende toe:
```json
// ...
    // "typeRoots": [],
    "types": [
        "node"
    ],
    // "allowSyntheticDefaultImports": true,
//...
```

Als het goed is geeft je editor nu geen problemen meer.

## Hoe nu verder?
Dit was een korte kennismaking met typescript, wat gerelateerde tools en transpilatie!

Je kunt nu evt. switchen naar gebruik van `tsc` voor in de browser i.p.v. in Node. Bijvoorbeeld met de `bouncing balls` opdracht (vraag docent). Maak een `index.html` aan met hierin een `<script src="hello-world.js">`. Netter is natuurlijk een meer toepasselijke bestandsnaam te vinden, en `scripts` sectie in `package.json` en ook andere delen aan te passen. Maar key is dus dat je source in HTML een `.js` is, maar je in `.ts` bestand(en) werkt.

Per HTML5 is de het `type="text/javascript""` attribute hierin niet meer nodig/verplicht. Zet de script tag wel onderaan de HTML body of gebruik het `defer` attribuut.


```bash
#    __                                      .__.__          __  .__              
#  _/  |_____________    ____   ____________ |__|  | _____ _/  |_|__| ____        
#  \   __\_  __ \__  \  /    \ /  ___/\____ \|  |  | \__  \\   __\  |/ __ \       
#   |  |  |  | \// __ \|   |  \\___ \ |  |_> >  |  |__/ __ \|  | |  \  ___/       
#   |__|  |__|  (____  /___|  /____  >|   __/|__|____(____  /__| |__|\___  >      
#                    \/     \/     \/ |__|                \/             \/       
#         .__        __                                                           
#    ____ |__| _____/  |_                                                         
#   /    \|  |/ __ \   __\                                                        
#  |   |  \  \  ___/|  |                                                          
#  |___|  /__|\___  >__|                                                          
#       \/        \/                                                              
#    __                                      .__               __  .__         ._.
#  _/  |_____________    ____   ____________ |__|___________ _/  |_|__| ____   | |
#  \   __\_  __ \__  \  /    \ /  ___/\____ \|  \_  __ \__  \\   __\  |/ __ \  | |
#   |  |  |  | \// __ \|   |  \\___ \ |  |_> >  ||  | \// __ \|  | |  \  ___/   \|
#   |__|  |__|  (____  /___|  /____  >|   __/|__||__|  (____  /__| |__|\___  >  __
#                    \/     \/     \/ |__|                  \/             \/   \/
```