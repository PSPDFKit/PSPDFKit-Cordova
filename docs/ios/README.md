# Cordova Plugin for PSPDFKit 10 for iOS

The [PSPDFKit SDK](https://pspdfkit.com/pdf-sdk/) is a framework that allows you to view, annotate, sign, and fill PDF forms on iOS, Android, Windows, macOS, and Web.

PSPDFKit comes with open source plugins for Cordova on both [iOS](https://pspdfkit.com/guides/ios/current/other-languages/apache-cordova-phonegap/) and [Android](https://pspdfkit.com/guides/android/current/other-languages/apache-cordova-phonegap/).

### Cordova Requirements

- A [development environment setup](https://cordova.apache.org/#getstarted) for running Cordova projects.
- The [latest stable version of cordova-lib](https://github.com/apache/cordova-lib/releases).
- The [latest stable version of cordova-ios](https://github.com/apache/cordova-ios/releases).
- The [latest stable version of Xcode](https://developer.apple.com/xcode/).
- The [latest stable version of CocoaPods](https://guides.cocoapods.org/using/getting-started.html#installation).

### Ionic Requirements

- A [development environment setup](https://ionicframework.com/getting-started/) for running Ionic projects.
- The [latest stable version of Node.js](https://nodejs.org/en/).
- The [latest stable version of Ionic CLI](https://ionicframework.com/docs/cli).
- The [latest stable version of `cordova-res`](https://www.npmjs.com/package/cordova-res).
- The [latest stable version of Xcode](https://developer.apple.com/xcode/).
- The [latest stable version of CocoaPods](https://guides.cocoapods.org/using/getting-started.html#installation).

## Cordova Installation

We assume that you have [an existing Cordova project](https://cordova.apache.org/#getstarted).

1. Open the Terminal app and change the location of the current working directory inside the newly created project:

```bash
cd path/to/YourProject
```

2. Remove all the platforms from your project to properly propagate the changes in the `config.xml` file below throughout the project:

```bash
cordova platform remove android
cordova platform remove ios
```

3. Open `config.xml` in a text editor to enable AndroidX and to change the deployment target to iOS 12 or later:

```bash
open config.xml
```

Your `config.xml` file should look like this:

```diff
...
  <platform name="android">
+   <preference name="AndroidXEnabled" value="true" />
    <allow-intent href="market:*" />
  </platform>
  <platform name="ios">
    <allow-intent href="itms:*" />
    <allow-intent href="itms-apps:*" />
+   <preference name="deployment-target" value="12.0" />
    ...
  </platform>
...
```

4. Add the PSPDFKit plugin:

```bash
cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git
```

5. Add back all the platforms:

```bash
cordova platform add android
cordova platform add ios
```

## Ionic Installation

We assume that you have [an existing Ionic project](https://ionicframework.com/docs/cli/start/).

1. Open the Terminal app and change the location of the current working directory inside the newly created project:

```bash
cd path/to/YourProject
```

2. Remove all the platforms from your project to properly propagate the changes in the `config.xml` file below throughout the project:

```bash
ionic cordova platform remove android
ionic cordova platform remove ios
```

3. Open `config.xml` in a text editor to enable AndroidX and to change the deployment target to iOS 12 or later:

```bash
open config.xml
```

Your `config.xml` file should look like this:

```diff
...
  <platform name="android">
-   <edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/application" xmlns:android="http://schemas.android.com/apk/res/android">
-      <application android:networkSecurityConfig="@xml/network_security_config" />
-   </edit-config>
+   <preference name="AndroidXEnabled" value="true" />
    ...
  </platform>
  <platform name="ios">
    <allow-intent href="itms:*" />
    <allow-intent href="itms-apps:*" />
+   <allow-navigation href="*" />
+   <preference name="deployment-target" value="12.0" />
    ...
  </platform>
...
```

4. Add back all the platforms:

```bash
ionic cordova platform add android
ionic cordova platform add ios
```

5. Add the PSPDFKit plugin:

```bash
ionic cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git
```

6. Declare PSPDFKit in the src/declarations.d.ts file:

```shell
echo "declare var PSPDFKit: any;" >> src/declarations.d.ts
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
cd PSPDFKit-Demo
```

2. Open `config.xml` and change the deployment target to iOS 12 or later:

```diff
...
  <platform name="android">
+   <preference name="AndroidXEnabled" value="true" />
    <allow-intent href="market:*" />
  </platform>
  <platform name="ios">
    <allow-intent href="itms:*" />
    <allow-intent href="itms-apps:*" />
+   <preference name="deployment-target" value="12.0" />
    ...
  </platform>
...
```

3. Add the PSPDFKit plugin:

```bash
cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git
```

4. Add the iOS platform

```bash
cordova platform add ios
```

5. Add the PDF document you want to display in your project’s `www` directory. You can use <a href="https://pspdfkit.com/downloads/pspdfkit-ios-quickstart-guide.pdf" download="Document.pdf">this QuickStart Guide PDF</a> as an example.

```bash
cp ~/Downloads/Document.pdf www/Document.pdf
```

6. Open the www/js/index.js file:

```bash
open www/js/index.js
```

7. Modify the onDeviceReady function like so:

```javascript
onDeviceReady: function() {
  this.receivedEvent('deviceready');
  // Set your license key here.
  PSPDFKit.setLicenseKey("LICENSE_KEY_GOES_HERE");
  const DOCUMENT = (window.cordova.platformId === "ios") ? "Document.pdf" : "file:///android_asset/Document.pdf";
  PSPDFKit.present(DOCUMENT);
},
```

8. The app is now ready to launch:

```bash
cordova emulate ios
```

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

1. Create a new Ionic project from the command line using the [Ionic Command-Line Interface (CLI)](https://ionicframework.com/docs/cli/start/):

```shell
ionic start PSPDFKit-Demo blank tabs --cordova --type=angular
cd PSPDFKit-Demo
```

2. Install the PSPDFKit plugin:

```shell
ionic cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git
```

3. Open `config.xml` in a text editor to enable AndroidX and to change the deployment target to iOS 12 or later:

```bash
open config.xml
```

Your `config.xml` file should look like this:

```diff
...
  <platform name="android">
-   <edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/application" xmlns:android="http://schemas.android.com/apk/res/android">
-      <application android:networkSecurityConfig="@xml/network_security_config" />
-   </edit-config>
+   <preference name="AndroidXEnabled" value="true" />
    ...
  </platform>
  <platform name="ios">
    <allow-intent href="itms:*" />
    <allow-intent href="itms-apps:*" />
+   <allow-navigation href="*" />
+   <preference name="deployment-target" value="12.0" />
    ...
  </platform>
...
```

4. Declare PSPDFKit in the src/declarations.d.ts file:

```bash
echo "declare var PSPDFKit: any;" >> src/declarations.d.ts
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
      const DOCUMENT = this.platform.is("ios")
        ? "Document.pdf"
        : "file:///android_asset/Document.pdf";
      PSPDFKit.present(DOCUMENT);
    });
  }
}
```

7. Run `ionic cordova platform add ios` to add the iOS platform.
8. Add the PDF document you want to display in your project’s `platforms/ios/www directory`. You can use <a href="https://pspdfkit.com/downloads/pspdfkit-ios-quickstart-guide.pdf" download="Document.pdf">this QuickStart Guide PDF</a> as an example.

```bash
cp ~/Downloads/Document.pdf platforms/ios/platform_www/Document.pdf
```

9. The app is now ready to launch:

```bash
ionic cordova emulate ios
```

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
cp resources/Document.pdf platforms/ios/platform_www/Document.pdf
```

5. The app is now ready to launch:

```bash
ionic cordova emulate ios
```

## API

You can find the API documentation in [PSPDFKit.js](../../www/PSPDFKit.js).

## Troubleshooting

### Problem:

```bash
Error: Cannot find plugin.xml for plugin "PSPDFKit-Cordova". Please try adding it again.
```

### Solution:

Run `cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git` instead of `ionic cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git`.

### Problem:

```bash
Installing "pspdfkit-cordova" for ios
Running command: pod install --verbose
/Users/yourUsername/.rbenv/versions/2.7.0/lib/ruby/gems/2.7.0/gems/cocoapods-1.10.1/lib/cocoapods/external_sources/podspec_source.rb:19: warning: calling URI.open via Kernel#open is deprecated, call URI.open directly or use URI#open

Failed to install 'pspdfkit-cordova': Error: pod: Command failed with exit code 1 Error output:
/Users/yourUsername/.rbenv/versions/2.7.0/lib/ruby/gems/2.7.0/gems/cocoapods-1.10.1/lib/cocoapods/external_sources/podspec_source.rb:19: warning: calling URI.open via Kernel#open is deprecated, call URI.open directly or use URI#open
    at ChildProcess.whenDone (/Users/yourUsername/Downloads/pspdfkit-cordova/examples/ionic/PSPDFKit-Demo/node_modules/cordova-common/src/superspawn.js:136:25)
    at ChildProcess.emit (events.js:315:20)
    at maybeClose (internal/child_process.js:1048:16)
    at Socket.<anonymous> (internal/child_process.js:439:11)
    at Socket.emit (events.js:315:20)
    at Pipe.<anonymous> (net.js:673:12)
pod: Command failed with exit code 1 Error output:
/Users/yourUsername/.rbenv/versions/2.7.0/lib/ruby/gems/2.7.0/gems/cocoapods-1.10.1/lib/cocoapods/external_sources/podspec_source.rb:19: warning: calling URI.open via Kernel#open is deprecated, call URI.open directly or use URI#open
[ERROR] An error occurred while running subprocess cordova.
        
        cordova platform add ios exited with exit code 1.
        
        Re-running this command with the --verbose flag may provide more
        information.
```

### Solution:

1. Open your project's Podfile:

```bash
open platforms/ios/Podifile
```

2. Modify your Podfile like so:

```diff
source 'https://github.com/CocoaPods/Specs.git'
- platform :ios, '11.0'
+ platform :ios, '12.0'
use_frameworks!
target 'MyApp' do
	project 'MyApp.xcodeproj'
	pod 'PSPDFKit', podspec: 'https://customers.pspdfkit.com/pspdfkit-ios/latest.podspec'
end
```

3. Change your local working directory to `platforms/ios`:

```bash
cd platforms/ios/
```

4. Run `pod install`
5. Change your local working directory back to the root of your project:

```bash
cd ../../
```

6. Launch your app:

**Cordova:**

```bash
cordova emulate ios
```

**Ionic:**

```bash
ionic cordova emulate ios
```

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
