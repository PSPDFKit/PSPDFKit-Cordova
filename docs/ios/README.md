# Cordova Plugin for PSPDFKit 10 for iOS

The [PSPDFKit SDK](https://pspdfkit.com/pdf-sdk/) is a framework that allows you to view, annotate, sign, and fill PDF forms on iOS, Android, Windows, macOS, and Web.

PSPDFKit comes with open source plugins for Cordova on both [iOS](https://pspdfkit.com/guides/ios/current/other-languages/apache-cordova-phonegap/) and [Android](https://pspdfkit.com/guides/android/current/other-languages/apache-cordova-phonegap/).

### Cordova Requirements

- The [latest stable version of cordova-lib](https://github.com/apache/cordova-lib/releases).
- The [latest stable version of cordova-ios](https://github.com/apache/cordova-ios/releases).
- The [latest stable version of Xcode](https://developer.apple.com/xcode/).
- The [latest stable version of CocoaPods](https://guides.cocoapods.org/using/getting-started.html#installation).

### Ionic Requirements

- The [latest stable version of Node.js](https://nodejs.org/en/).
- The [latest stable version of Ionic CLI](https://ionicframework.com/docs/cli).
- The [latest stable version of `cordova-res`](https://www.npmjs.com/package/cordova-res).
- The [latest stable version of Xcode](https://developer.apple.com/xcode/).
- The [latest stable version of CocoaPods](https://guides.cocoapods.org/using/getting-started.html#installation).

## Installation

We assume that you have [an existing Cordova project](https://cordova.apache.org/#getstarted).

1. Open the Terminal app and change the location of the current working directory inside the your project:

```bash
cd path/to/YourProject
```

2. Remove all the platforms from your project:

```bash
cordova platform remove android
cordova platform remove ios
```

3. Add back all the platforms:

```bash
cordova platform add android
cordova platform add ios
```

4. Open `config.xml` in a text editor and change the deployment target to iOS 12 or later:

```bash
open config.xml
```

Your `config.xml` file should look like this:

```diff
...
  <platform name="ios">
    <allow-intent href="itms:*" />
    <allow-intent href="itms-apps:*" />
+   <preference name="deployment-target" value="12.0" />
  </platform>
...
```

## Usage

The plugin is accessed via the PSPDFKit singleton. Here are some example calls:

```javascript
// Set your license key here.
PSPDFKit.setLicenseKey("YOUR KEY");

// Show pdf with in single page mode, with a black background.
PSPDFKit.present("pdf/document.pdf", {
  pageMode: "single",
  backgroundColor: "black",
});

// Show a PDF document with a callback.
PSPDFKit.present("pdf/document.pdf", function () {
  alert("pdf has appeared");
});

// Scroll to page 1.
PSPDFKit.setPage(1, true);

// Get the page number.
PSPDFKit.getPage(function (page) {
  alert("Current page: " + page);
});
```

5. Add the PSPDFKit plugin:

```bash
cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git
```

## Getting Started

### New Cordova Project

Let's create a minimal Corodva app that integrates PSPDFKit and uses the `pspdfkit-cordova` plugin.

1. Create the new Cordova project by running app by running the following command:

```bash
cordova create PSPDFKit-Demo com.pspdfkit.demo PSPDFKit-Demo
```

2. Add the PDF document you want to display in your project’s `www` directory. You can use <a href="https://pspdfkit.com/downloads/pspdfkit-ios-quickstart-guide.pdf" download="Document.pdf">this QuickStart Guide PDF</a> as an example.

```bash
cp ~/Downloads/Document.pdf www/Document.pdf
```

3. Modify the `onDeviceReady` function in `www/js/index.js` like so:

```javascript
onDeviceReady: function() {
  this.receivedEvent('deviceready');
  // Set your license key here.
  PSPDFKit.setLicenseKey("LICENSE_KEY_GOES_HERE");

  // Show pdf with in single page mode.
  PSPDFKit.present('Document.pdf', {
    pageMode: 'single',
  });
},
```

4. `cd` into `Cordova-Demo` and run `cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git` to install the `pspdfkit-cordova` plugin.
5. Open `config.xml` and change the deployment target to iOS 12 or later:

```diff
...
  <platform name="ios">
    <allow-intent href="itms:*" />
    <allow-intent href="itms-apps:*" />
+   <preference name="deployment-target" value="12.0" />
  </platform>
...
```

6. Run `cordova platform add ios` to add the iOS platform.
7. Run the app: Open `platforms/ios/CordovaDemo.xcworkspace` in Xcode, then build and run, or run `cordova emulate ios` in the Terminal.

### Running the PSPDFKit-Demo Cordova Example

1. Open the Terminal app and clone the GitHub repository:

```bash
git clone https://github.com/PSPDFKit/pspdfkit-cordova.git
```

2. Change the current working directory to the example project’s folder:

```bash
cd pspdfkit-cordova/examples/cordova/PSPDFKit-Demo
```

2. Install the dependencies:

```bash
npm install
```

3. Add the iOS platform:

```bash
cordova platform add ios
```

4. The app is now ready to launch:

```bash
cordova emulate ios
```

### New Ionic Project

Let's create a minimal Ionic app that integrates PSPDFKit and uses the `pspdfkit-cordova` plugin.

1. Run `ionic start IonicDemo blank --type=angular` to create a new Ionic project.
2. Open `config.xml` and change the deployment target to iOS 12 or later:

```diff
...
  <platform name="ios">
    <allow-intent href="itms:*" />
    <allow-intent href="itms-apps:*" />
+   <preference name="deployment-target" value="12.0" />
  </platform>
...
```

3. `cd` into `IonicDemo` and run `ionic cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git` to install the `pspdfkit-cordova` plugin.
4. Declare PSPDFKit in the src/declarations.d.ts file:

```bash
echo "declare var PSPDFKit: any;" > src/declarations.d.ts
```

5. Open the `src/app/app.component.ts` file:

```bash
open src/app/app.component.ts
```

6. Replace the entire contents of the `app.component.ts` file with the following code snippet:

```typescript
import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      PSPDFKit.setLicenseKey("LICENSE_KEY_GOES_HERE");
      PSPDFKit.present("Document.pdf");
    });
  }
}
```

7. Add the PDF document you want to display in your project’s `platforms/ios/www directory`. You can use <a href="https://pspdfkit.com/downloads/pspdfkit-ios-quickstart-guide.pdf" download="Document.pdf">this QuickStart Guide PDF</a> as an example.

```bash
cp ~/Downloads/Document.pdf platforms/ios/platform_www/Document.pdf
```

8. Run `ionic cordova platform add ios` to add the iOS platform.
9. Run `ionic cordova prepare ios` to prepare iOS platform.
10. Run the app: Open `platforms/ios/MyApp.xcworkspace` in Xcode, then build and run, or run `ionic cordova emulate ios` in the Terminal.

### Running the PSPDFKit-Demo Ionic Example

1. Open the Terminal app and clone the GitHub repository:

```bash
git clone https://github.com/PSPDFKit/pspdfkit-cordova.git
```

2. Change the current working directory to the example project’s folder:

```bash
cd pspdfkit-cordova/examples/ionic/PSPDFKit-Demo
```

2. Install the dependencies:

```bash
npm install
```

3. Add the iOS platform:

```bash
ionic cordova platform add ios
```

4. Copy the PDF document from the `resources` directory into your project’s `platform_www` directory:

```bash
cp resources/Document.pdf platforms/ios/platform_www/
```

5. The app is now ready to launch:

```bash
ionic cordova emulate ios
```

## API

You can find the API documentation in [PSPDFKit.js](../../www/PSPDFKit.js).

## Troubleshooting

### Problem:

```sh
Error: Cannot find plugin.xml for plugin "PSPDFKit-Cordova". Please try adding it again.
```

### Solution:

Run `cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git` instead of `ionic cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git`.

## Migration Guide from `Cordova-iOS`

If you were using the old [Cordova-iOS Plugin](https://github.com/PSPDFKit/Cordova-iOS), please follow the steps below to migrate to this plugin:

1. Remove the old plugin: `cordova plugin remove pspdfkit-cordova-ios`
2. Open your Xcode project or workspace and remove `PSPDFKit.framework` and `PSPDFKitUI.framework` from your Target:

![remove-frameworks](screenshots/remove-frameworks.png)

3. Close your Xcode project or workspace.
4. Integrate the new `pspdfkit-cordova` Plugin. See the [Install](#installation) instructions above.
5. Rename all `PSPDFKitPlugin` calls to `PSPDFKit` in your app's JavaScript code:

```diff
- PSPDFKitPlugin.setLicenseKey("YOUR KEY");
+ PSPDFKit.setLicenseKey("YOUR KEY");

- PSPDFKitPlugin.present('pdf/document.pdf', {
+ PSPDFKit.present('pdf/document.pdf', {
  pageMode: 'single',
});
```
