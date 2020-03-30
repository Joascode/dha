# DHA Sensor app - 2019 edition

Hieronder de korte opdrachtomschrijving van app-2, een getting-started guide, een in te vullen template en de vereisten/beoordelingsmodel.

## Opdrachtsomschrijving

App-2 is wat vrijere opdracht dan app-1. Je maakt een eigen app die een integratie heeft met twee zelf te kiezen 'sensors' en een http service. Om sensors te benaderen gebruik je [Ionic Native](https://ionicframework.com/docs/native/), en/of evt. het nieuwere [Capacitor](https://capacitor.ionicframework.com)<sup>*</sup>.

Denk bij sensors aan gyrometer, lichtsensor, microfoon, (flits)licht, camera, GPS, maar ook communicatie als Bluetooth, NFC, infrarood, push notifications e.d. Je integreert ook met een http API en combineert de gegevens bij voorkeur via RxJS (libary voor het Observable pattern die standaard met Angular meekomt).

<sup>*</sup>Capacitor is de beoogde standaard (2019) vervanging van Cordova voor Ionic 4: Native Progressive WebApps.

De app is niet heel groot, maar een Minimum Viable Product (MVP). Deze app moet wel echt werken, niet crashen en er 'goed' uit zien. Als je sensor integraties ook nuttig kun je er in app-3 op verder werken. Denk dan na over toepasselijke sensors en mogelijke uitbreiding en bekijk de extra eisen die er in app-3 bij komen. Hiervoor moet je dan functionaliteit toevoegen.

## How to get started: Duo vormen

Voorwaarde om aan app-2 (en app-3) te beginnen is dat je beide app-1 zelfstandig hebt gemaakt en laten aftekenen bij docent

- Zorg dat je een partner hebt voor app-2 en -3
- Klik op de GitHub classroom link en kies je e-mail adres en zorg dat je bij elkaar in de groep komt
- Brainstorm samen over een app en bedenk een naam (werk-titel)
- Kies minstens 2 [sensor integraties](http://ionicframework.com/docs/native/) die je gaat gebruiken (Ionic Native packages)
- Bepaal een aantal [Ionic controls/components](https://ionicframework.com/docs/components/) die je wilt gaan; maak evt. wat scherm ontwerpjes en neem deze op in je `README.md` voorstel.
- Kies een http integratie, een externe API die je kunt gebruiken zoals Google maps, Firebase, [openweatherma](https://openweathermap.org/api), etc. Of evt. een formaat voor lokaal `.json` bestand met testdata.
- Denk evt. vast na hoe je een Rx operator/functie kunt gebruiken voor combinatie van sensor input of output met elkaar of met data uit een http API data
- Schrijf een kort voorstel voor App-2
- Denk ook alvast aan (her)gebruik van je sensor in de Eindopdracht (App3, en schrijf een sectie 'Uitbreiding')
- Kopieer de content hieronder over normering uit deze `README.md` naar een nieuw bestand `beoordeling.md` en vervang deze met dit voorstel in deze README.md. Gebruik [MarkDown](https://guides.github.com/features/mastering-markdown/) zodat het er beetje uit ziet en structuur heeft
- Check dat je aan al deze acties hebt gedaan, en vervang dan deze bovenstaande template teksten door ingevulde velden hieronder
- Maak een issue in de repo met taak voor docent om het voorstel te lezen, en assign dit issue aan de docent (zodat deze een mail krijgt evt. nog een @-mention).
- Hierna maak je een app met z'n tweeen. Je kunt tot slot een self-assessment invullen in `beoordeling.md`. Indien je deze volledig hebt ingevuld en jezelf plus- en minpunten hebt toegekend en hierbij tot precies hetzelfde cijfer komt als de docent tijdens het assessment, krijg je 0.5 punt bovenop dit bepaalde cijfer.

## [Naam App (Werknaam)]

### Conceptbeschrijving

[...]

### Groepsleden 

[Naam1] & [Naam2]

### Keuzes qua technische vereisten

- Te gebruiken [Ionic UI componentent](https://ionicframework.com/docs/components) (of evt. [CDK uit Angular 7](https://material.angular.io/cdk/categories) of desgewenst andere UI frameworks): [Component1], [...2]
- Sensor integraties: [Sensor1] & [Sensor2]
- HTTP/API integratie(s): [Integratie1]
- Evt. RxJS operators: [operator1] (geen `subscribe`, of `Subject`)

## Normering

Onder `1 Basiscijfer` staat een lijst van minimale vereisten voor een voldoende (6). Als je er één mist is het een knock-out. Onder `2` en `3` dan nog een lijst van punten waarmee jullie respectievelijk min- of juist pluspunten kunt halen. Je kunt minpunten compenseren met pluspunten. De docent kan een pluspunt ook deels toekennen. Een enkel missend vereist item kan evt. ook doorschuiven naar app-3, als het klein is en de app overall een voldoende indruk geeft.

Kijk bij [app-3](https://github.com/HANICA-MAD/dha-eindopdracht-2019) voor een gedetailleerdere beoordelingscriteria (rubric) qua min- en pluspunten (die zijn daar grotendeels hetzelfde). De niveaubeschrijvingen zijn hier weggelaten om het overzichtelijk te houden. Bij zwaar overtreden van minpunten kan dit ook als knock-out gelden.

### 1. Basiscijfer **6**

Als minimaal voldaan is aan al de volgende vereisten:

- [ ] 1. Geef je app folder een naam volgens de [github conventie](https://stackoverflow.com/questions/11947587/is-there-a-naming-convention-for-git-repositories) (kebab case)
- [ ] 2. Zorg dat je app niet `MyApp` heet (de standaard naam)
- [ ] 3. Stel (voor i.i.g. iOS/Android) direct een goede bundle identifier in (dus *niet* `io.ionic.starter`, maar eigen reverse domain name met 3 componenten, bv: `nl.dha.mijn-naam`)
- [ ] 4. Twee (of meer) sensoren integratie (met `Promise` of `Observable` resultaat)
- [ ] 5. Haalt data op via een `http` call (bij externe service/API, of evt. lokaal .json bestand)
- [ ] 6. Gebruikt een aantal Ionic controls/components (of controls uit andere library)
- [ ] 7. Accepteert gebruikers input (uit de UI; hier wordt dus NIET sensor input genoemd, dat valt onder 4)
- [ ] 8. Gebruik een aantal [ionicons](https://ionicons.com/) of indien gewenst een andere icon set
- [ ] 9. Visualisatie van opgehaalde data
     - Doe dit met een control, grafiek of wellicht zelfs [SVG image](https://www.joshmorony.com/using-an-svg-for-animation-in-ionic/) of iets dergelijks
     - Dus niet alleen een `console.log` of kale getallen tonen (maar dat is wel beste punt om te beginnen)
- [ ] 10. Maak een custom *app icon* en *splash screen* voor je app (met `[ionic resources](https://ionicframework.com/docs/cli/commands/cordova-resources)`):

> ionic cordova resources -help

- [ ] 11. Als je sensors gebruikt die gebruikspermissie nodig hebben (zoals GPS), vraag dit dan op het goede moment (gebruiker voorbereiden, dus niet meteen, zie sheets les 5)
- [ ] 12. Splits view-logica (component) van de sensor/business/overige-logica via gebruik van (eigen) injectables/services/providers (e.g. masseer de data voor via gebruik facade pattern ;)

### 2. Minpunten

- [ ] M1. Te laat **-1**
- [ ] M2. Smelly code **-1**
- [ ] M3. Werkend, maar buggy **-1**
- [ ] M4. Crappy layout **-1** (vraag feedback docent, of doe '[hallway usability testing](https://en.wikipedia.org/wiki/Usability_testing#Hallway_testing)')

### 3. Pluspunten

- [ ] P1. Goed en toepasselijk gebruik RxJS operators **max +1**
- [ ] P2. Uitgebreide configuratie mogelijk **max +1**
- [ ] P3. Aantrekkelijk design **max +1**
- [ ] P4. CSS of JS Animatie **max +1**
- [ ] P5. Vrije toevoeging **max +1** (ter beoordeling docent)

### Toelichting

Merk op dat er voor app 2 naast het uitlezen van native sensors nog wat eisen zijn:

1. Van de sensor input moet een visualisatie gemaakt worden. Bijvoorbeeld:
   - Via Bluetooth ontvangen of verzonden input visualiseren
   - balletje dat rolt in 2D canvasop basis van gyroscope
   - push berichten tonen op scherm
   - kompas draait rond met compass input mee
2. De gebruiker kan invoer doen en zo de visualisatie beinvloeden/configureren, of data bewerken. Bijvoorbeeld:
   - Bluetooth waarden clearen, of waarden invoeren om te verzenden
   - Gewicht en/ofof grootte van balletje instellen, achtergrondkleur of afbeelding instellen
   - Push berichten ingeven, of sorteeropties kiezen voor volgorde getoonde berichten, of knoppen om toestemming te vregen
   - Kleur kompas instellen, of update snelheid van sensor waarden hiervan
3. Voor het RxJS pluspunt is het niet voldoende om `subscribe` te gebruiken. Verdiep je evt. nog even in [RxJS](https://angular.io/guide/rx-library). 
   [Kies andere operators](http://reactivex.io/documentation/operators.html#tree) om op de stream events die `subscribe` afhandelt eerst een `filter`, `debounce`, `map` of andere RX operator gebruiker, passend en functioneel voor de situatie.