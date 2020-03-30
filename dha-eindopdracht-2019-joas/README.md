# DHA Eindopdracht app - 2019 edition

## Quick, Draw! Gone Hybrid!

Foremost, credits go to Google for implementing and sharing the incredible Quick, Draw! implementation. I'm using their data and concept for the last hybrid application I have to build for my semester.

The concept is the same as Google's Quick, Draw! but now implemented as a hybrid app, developed in Ionic. It uses Tensorflow.js on the frontend.

### Purpose

The main goal of this hybrid Quick, Draw! application is to experiment with performance. Lots of stories go around the web telling that Hybrid's performance is the weakpoint of Hybrid apps. With this Quick, Draw application I want to test how much work in a Hybrid app is too much.
The application will use Google's Quick, Draw data to create a model and use that model in Tensorflow.js inside the hybrid app. While using the Tensorflow.js to validate the input given by the user, the actual input will be drawn by the user. So not only running a machine learning model inside the app, the app has to handle drawing of figures as well.

### Requirements

- Able to draw figures with finger
- Uses Tensorflow.js to validate drawn figures
- Validates drawn figures with use of Google's Quick, Draw data
- Shows a timer to the user with the amount left to draw the right figure
- Shows to the user the required figure to draw
- Tells the user that it recognizes the drawn figure (either the required figure, or the wrong figure it recognizes)
- If the user drawn the right figure, the drawing stops and shows success
- After the timer runs out, it shows an appropriate message
- Ability to start playing
- Figure to draw is randomly chosen
- Ability to replay with the same figure
- Ability to play again with new randomly chosen figure
- Keeps track of user's attempts

### Used techniques

- Local storage for user's data
- Tensorflow.js to validate drawn figures

## Normering App 3 - Eindopdracht

_Sorry for the Dutch, teacher's addition._

Onder `1 Basiscijfer` staat een lijst van minimale vereisten voor een voldoende (6). Als je er één mist is het een knock-out. Onder `2` en `3` dan nog een lijst van punten waarmee jullie respectievelijk min- of juist pluspunten kunt halen. Je kunt minpunten compenseren met pluspunten. De docent kan een pluspunt ook deels toekennen. Een enkel missend vereist item kan evt. ook doorschuiven naar app-3, als het klein is en de app overall een voldoende indruk geeft.

### 1. Basiscijfer 6

Als voldaan is aan deze minimale vereisten:

- [x] 1. Tijdig aanleveren voorstel App-3 (nieuw idee of significante uitbreiding App-2)
- [ ] 2. Kopieer deze README naar `beoordeling.md` en maak een eigen `README.md` met weer een 'how-to-run' en functioneel overzicht.
- [x] 3. App werkt ook in je browser (afvangen van fouten door missende native functionaliteit en tonen nette melding gebruiker)
- [x] 4. Ziet er overall goed uit, is responsive en crasht niet (of nauwelijks)
- [ ] 5. Heeft - net als App 2 - _niet_ de standaard naam, app icon, splash screen of bundle identifier
- [x] 6. De app is van jezelf, niet gekopieerd (e.g. app bevat aantal originele elementen in \*1 - Bestaat wel, maar dan alleen als browservariant)
- [x] 7. Voor tenminste één platform gebouwd
- [x] 8. Code, folderstructuur en bestandsnamen voldoen aan _de link:https://angular.io/guide/styleguide[Angular Styleguide]_
- [x] 9. De app slaat zaken _(lokaal!) op_ (zoals settings, laatste level, eerdere gedane input)\*
- [x] 10. App bevat tenminste één (Angular) _custom component_ (met attributen/parameters waaronder minstens 1 `@Input` en 1 `@Output`!)\*
- [x] 11. GEEN wachtwoorden opslaan in App (als toch perse nodig is, gebruik link:https://ionicframework.com/docs/native/intel-security/[IntelSecurity] of gelijkwaardig; NIET zelf security implementeren)
- [x] 12. Gebruik kan op intuitieve manier invoer doen in app (bv. configuratie, sensor sensitiviteit, spelersniveau van game)
- [x] 13. Schrijf unit tests voor cruciale/complexere functionaliteiten in je app (minsten 4 unit tests)
- [ ] 14. Schrijf in de README ook een reflectie op basis van de demo les (met evt. debat): Evaluatie app + hybrid vs. native\*

### Reflection

#### Points of improvement

- [ ] Drawing detection works on mobile as well as it does in the browser.
- [ ] Extend the amount of drawings that can be recognized.
- [ ] Fix the occasional DOM Exception, where the index is negative or too great.
- [ ] Loading animation in its own component, for reusability.
- [ ] Drawing functionality from draw-canvas component transferred to drawing-support service.
- [ ]

#### Functionality that require different implementation on Native

- [ ] (Easier) Drawing of figures not on a canvas, developed for browsers. But instead a specific implementation for native, so easier to debug for the specific platform.
- [ ] (Hard/impossible(?)) Tensorflow.js implementation does not work natively on iOS and Android, so need a different library to the heavy lifting.

#### Eigen voorkeur

Native

- While developing apps for this course, it seems that I was mostly fighting with Ionic, instead of actually enjoying creating apps. This did raise the satisfaction of seeing an actual working app, but that it works should be a given. It takes too much effort and struggles to get it done.
- Sensors are easier to reach and easier to debug, in case one requires more setup.
- Ionic documentation is actually quite terrible. And not to mention the support. The forum answers are occasionally left open, without a single reponse.
- Library support is occasionally lacking. Some libraries are outdated, or hardly maintained. The geolocation library is one of them.

The only time where I would maybe use Ionic, is when the app hardly requires intense use of the platform (like sensors). A CRUD-application which doesn't require alot of logic to work. Maybe with a start-up idea? But even then, the technical debt you collect can be a show-stopper later on.

## Getting started with the app

### Prerequisites

To get started with the application in this repository, you need the following products installed.

- NodeJS version 11.6.0 (with npm version 6.5.0-next.0)
- Ionic CLI version 4.10.2
- If you want to deploy to your phone, you require a bit more:

  - Android Studio (https://developer.android.com/studio/run/device)

  _Use this StackOverflow post to fix license agreements issues when running the commands to build the application for Android: https://stackoverflow.com/questions/40383323/cant-accept-license-agreement-android-sdk-platform-24/40383457#40383457 If the commands in the post fail, try to execute them as admin in the original command line tool of Windows._

  - Java JDK (https://openjdk.java.net/install/)

  _It seems Cordova asks for version 1.8, which is JDK 8. Get the official version from Oracle https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html and setup the PATH properly: https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/ && windows troubleshooting in case you set previous PATH to \bin: https://stackoverflow.com/questions/45182717/java-home-is-set-to-an-invalid-directory/49592887_

  - XCode (https://developer.apple.com/xcode/)

You install Ionic via NodeJS. So to get everything installed properly, you start with NodeJS.
Follow the steps below to get all the prerequisites installed.

(1) There are a couple of ways to get NodeJS installed. If you prefer to use multiple NodeJS versions on your machine, I recommend getting NVM installed. NVM stands for Node Version Manager. NVM makes it possible to switch easily between Node versions. NVM does require some setup, so if you want to start immideatly and don't use different versions of Node, I could recommend using Node directly.

- Install of NVM: https://github.com/creationix/nvm (after install you can download Node via NVM on the command line. Specify which version you need, you can't say latest unfortunately).
- Install NodeJS directly: https://nodejs.org/en/download/ (search for a specific version, or use the latest version if you want).

(2) To get Ionic, use the following command in the terminal (any location inside your terminal): <code>npm install -g Ionic</code> or <code>npm i -g Ionic</code> if you prefer shorter commands.
If you want to use the same version as I used, use the following command instead: <code>npm install -g Ionic@4.10.2</code>. You can use <code>npm install -g Ionic@^4.0.0</code> if you want to use the latest minor version of 4.0.

This command will install (install / i) the latest version of Ionic globally (-g) for npm. If you are using NVM, the global scope will be tied to your active version of node. If you switch to a different version, it won't be able to find Ionic globally anymore, until Ionic is installed globally for that version as well.

To test if Ionic is installed correctly, type: <code>Ionic --version</code> in your terminal. If it says the command Ionic is unknown, try closing the terminal and type the command in a new terminal. If it still fails to recognize the command, try troubleshooting on the internet. Unfortunately the Ionic website does not got any recommendations for troubleshooting.

## Cloning the application

With the prerequisites installed, you can get the repository on your machine via Git. If you don't got Git installed on your machine, please follow these links:

- For Mac and Linux: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
- For Windows users: https://gitforwindows.org/

If you are unsure wether you got Git installed or not, type <code>git --version</code> in a terminal. If you see a version number, you got Git installed.

If Git is installed, get this repository on your machine via the following steps:

- If you are using HTTPS clones: <code>git clone https://github.com/HANICA-MAD/dha-sensor-2019-joas-en-niels-2019.git</code>
- If you are using SSH clones: <code>git clone git@github.com:HANICA-MAD/dha-sensor-2019-joas-en-niels-2019.git</code>

Type one of these commands in your terminal in the directory where you want the repository cloned to. In my case I use a projects folder inside my Documents folder. If I boot up a terminal, I switch to this folder using the following command: <code>cd Documents/projects</code>. See the screenshot for clarity. For Windows users it might be required to type <code>cd ./Documents/projects</code>.

## 4. Running the application

With the repository on your machine, you are able to run the application in multiple fasions: in the browser, or on your mobile.

### 4.1 Browser

To run the application in the browser, follow the steps below from the folder in which you cloned the repository to.

- Step into the cloned folder: <code>cd dha-sensor-2019-joas-en-niels-2019</code>
- Once inside the folder, type the following command: <code>npm install</code> This command will install all the required dependencies. If you want to know which dependencies these are, check the package.json file inside the root folder. This command will take a while, since Ionic requires quite alot of dependencies.
- Once the npm install command finishes, you are able to run the application in the browser. Simply type <code>ionic serve</code> This command will load up Ionic to serve your application. It uses Angular in the background and requires some time to fully boot. Once loaded, it will open up a browser tab for the application with the required url. If you make adjustments inside the code and hit save, the ionic serve command will notice these changes and do a reload of the page.

If all went well, the application should be visible inside your default browser. If the installation fails for some reason, try to troubleshoot the error in your favorite search engine. If you see yellow warning messages, you could ignore them for now since they won't fail the installation. Though it's a good practice to try to resolve those as well.

**Warning**

If you get crypto node_modules warnings in the browser console, try the following in your favorite IDE:

Hand edit `node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js' and change the lines in that regex:

<code>
// old:
node: false,
// new:
node: { crypto: true, stream: true },
</code>

You can use CTRL (or Command on Mac) + F to find node mentions. The last mention is the one you need to edit.

### 4.2 On Mobile

There are two ways to run the application on a mobile.

- Ionic DevApp: Extends the capabilities of Ionic Framework. It runs as a realtime view, when changes are detected it will refresh the app. It requires the DevApp app of Ionic, downloaded from the App Store or Google Play.
- Via a build process: Ionic builds the project to their respective targets: Android or iOS. This requires Cordova or Capacitor, as these frameworks build the application to the specific target.

For more information on both deployment strategies, read: https://ionicframework.com/docs/building/running/. I will handle the steps required for Android deployment via the build proces in this README, since I used that for deploying the application to my phone.

#### 4.2.1 Deploying to Android via Build process

The following steps are required to build the application for Android:

- Make sure Android Studio is installed, since it's required to deploy the application to your Android phone. There might be other ways, but I'm not knowledgable about those.
  After install, be sure to set it up properly with your phone. Check the following link for more information: https://developer.android.com/studio/run/device. For Windows users it might be a hassle to configure the connection to your phone properly. Read the link carefully, if anything goes wrong, the article helps you a long way.
- Connect your phone or tablet via the USB.
- Install cordova via the command line: <code>npm i -g cordova</code>. This command will install cordova globally, same way as it did with Ionic earlier. Cordova is required because it will be responsible for building the project to the specific target.
- Once installed, go to the project folder where the application resides. If you cloned the project, you have to change the directory: <code>cd (location of cloned repository folder)</code>.
- (this step might be skipped, try step 7 first) Once inside the appropriate directory, run: <code>ionic cordova prepare android</code>.
- If the Android platform is not found on your machine, the command will ask you if you want to install it. Press Y and Enter/Return if it does.
- The command will execute and build the application.
- Once the command is ready, fire off the next command: <code>ionic cordova run android -l --ssl</code> (-l is the livereload server, can be skipped. The --ssl is required for the livereload server, since geolocation requires a https server)
- Once that command finishes without errors, the application should be visible on your phone or tablet.
