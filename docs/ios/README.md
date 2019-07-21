Cordova Plugin for PSPDFKit 8 for iOS
========================================

The [PSPDFKit SDK](https://pspdfkit.com/pdf-sdk/) is a framework that allows you to view, annotate, sign, and fill PDF forms on iOS, Android, Windows, macOS, and Web. [PSPDFKit Instant](https://pspdfkit.com/instant/) adds real-time collaboration features to seamlessly share, edit, and annotate PDF documents.

PSPDFKit comes with open source plugins for Cordova on both [iOS](https://pspdfkit.com/guides/ios/current/other-languages/apache-cordova-phonegap/) and [Android](https://pspdfkit.com/guides/android/current/other-languages/apache-cordova-phonegap/).

**This plugin works with Cordova version 8.1.2 and above.**  
**Please also make sure that you're using the latest version of Xcode 10.**

Install
-----------

We assume that you have [an existing Cordova project](https://cordova.apache.org/#getstarted).

1. Run `cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git` to install the `pspdfkit-cordova` plugin.
2. Update yoor `Podfile`: `cd platforms/ios` and open your `Podfile` in a text editor. Make sure the platorm is set to iOS 11 or later, and replace `YOUR_COCOAPODS_KEY_GOES_HERE` with your own CocoaPods Key. Your `Podfile` should look like this:

```diff
source 'https://github.com/CocoaPods/Specs.git'
- platform :ios, '9.0'
+ platform :ios, '11.0'

use_frameworks!
target 'CordovaDemo' do
	project 'CordovaDemo.xcodeproj'
-	pod 'PSPDFKit', podspec: 'https://customers.pspdfkit.com/cocoapods/YOUR_COCOAPODS_KEY_GOES_HERE/pspdfkit/latest.podspec'
+	pod 'PSPDFKit', podspec: 'https://customers.pspdfkit.com/cocoapods/USE_YOUR_OWN_COCOAPODS_KEY/pspdfkit/latest.podspec'
end
```

**Important** If you’re an existing customer, you can find the CocoaPods and license keys in your [customer portal](https://customers.pspdfkit.com/). Otherwise, if you don’t already have PSPDFKit, [sign up for our 60-day trial](https://pspdfkit.com/try/) and you will receive an email with the instructions to get started.

3. Install the Pods: run `pod install`.

Usage
-----------

The plugin is accessed via the PSPDFKit singleton. Here are some example calls:
    
    // Set your license key here.
    PSPDFKit.setLicenseKey("YOUR KEY");

    // Show pdf with in single page mode, with a cblack background.
    PSPDFKit.present('pdf/document.pdf', {
        pageMode: 'single',
        backgroundColor: 'black'
    });
    
    // Show a PDF document with a callback.
    PSPDFKit.present('pdf/castles.pdf', function() {
        alert('pdf has appeared');
    });
    
    // Scroll to page 1.
    PSPDFKit.setPage(1, true);
    
    // Get the page number.
    PSPDFKit.getPage(function(page) {
        alert('Current page: ' + page);
    });

Getting Started
---------------

#### New Cordova Project

Let's create a simple Corodva app that integrates PSPDFKit and uses the `pspdfkit-cordova` plugin.

1. Run `cordova create Cordova-Demo com.pspdfkit.demo CordovaDemo` to create a new Cordova project.
2. Add a sample PDF into your `www` directory: `www/pdf/document.pdf`.
3. Modify the `onDeviceReady` function in `www/js/index.js` like so:

```javascript
onDeviceReady: function() {
  this.receivedEvent('deviceready');
    // Set your license key here.
    PSPDFKit.setLicenseKey("YOUR KEY");

    // Show pdf with in single page mode.
    PSPDFKit.present('pdf/document.pdf', {
      pageMode: 'single',
    });
  },
  
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');
    
    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  }
};
```

4. Run `cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git` to install the `pspdfkit-cordova` plugin.
5. Open `config.xml` and change the deployment target to iOS 11 or later:

```diff
<platform name="ios">
	<allow-intent href="itms:*" />
	<allow-intent href="itms-apps:*" />
+	<preference name="deployment-target" value="11.0" />
</platform>
```

6. Use your CocoaPods Key: `open plugins/pspdfkit-cordova/plugin.xml` and replace `YOUR_COCOAPODS_KEY_GOES_HERE` with your own key. If you’re an existing customer, you can find the CocoaPods and license keys in your [customer portal](https://customers.pspdfkit.com/). Otherwise, if you don’t already have PSPDFKit, [sign up for our 60-day trial](https://pspdfkit.com/try/) and you will receive an email with the instructions to get started.

5. Run `cordova platform add ios` to add the iOS platform.
6. Run the app: Open `platforms/ios/CordovaDemo.xcworkspace` in Xcode, then build and run, or run `cordova emulate ios` in the Terminal.

#### New Ionic Project

Let's create a simple Ionic app that integrates PSPDFKit and uses the `pspdfkit-cordova` plugin.

1. Run `ionic start IonicDemo blank --type=angular` to create a new Ionic project.
2. Run `ionic cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git` to install the `pspdfkit-cordova` plugin.
3. Add a sample PDF into your `www` directory: `www/pdf/document.pdf`.
4. Open `config.xml` and change the deployment target to iOS 11 or later:

```diff
<platform name="ios">
	<allow-intent href="itms:*" />
	<allow-intent href="itms-apps:*" />
+ 	<allow-navigation href="*" />
+	<preference name="deployment-target" value="11.0" />
</platform>
```

5. Use your CocoaPods Key: `open plugins/pspdfkit-cordova/plugin.xml` and replace `YOUR_COCOAPODS_KEY_GOES_HERE` with your own key. If you’re an existing customer, you can find the CocoaPods and license keys in your [customer portal](https://customers.pspdfkit.com/). Otherwise, if you don’t already have PSPDFKit, [sign up for our 60-day trial](https://pspdfkit.com/try/) and you will receive an email with the instructions to get started.

6. Declare `PSPDFKit` in `src/declarations.d.ts` (create this file first): `declare var PSPDFKit: any;`
7. Modifying `src/app/app.component.ts` to use the PSPDFKit plugin to Present a PDF:

```javascript
constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      PSPDFKit.setLicenseKey('YOUR KEY');
      PSPDFKit.present('pdf/document.pdf', {});
    });
}
```

8. Run `ionic cordova platform add ios` to add the iOS platform.
9. Run `ionic cordova prepare ios` to prepare iOS platform.
10. Run the app: Open `platforms/ios/MyApp.xcworkspace` in Xcode, then build and run, or run `ionic cordova emulate ios` in the Terminal.

### Troubleshooting

#### Problem:

```sh
Error: Cannot find plugin.xml for plugin "PSPDFKit-Cordova". Please try adding it again.
```

#### Solution:

Run `cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git` instead of `ionic cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git`.

API
------------

You can find the API documentation in [PSPDFKit.js](../../www/PSPDFKit.js).

`Cordova-iOS` Migration Guide
----------------------------

If you were using the old [Cordova-iOS Plugin](https://github.com/PSPDFKit/Cordova-iOS), please follow the steps below to migrate to this plugin:


1. Remove the old plugin: `cordova plugin remove pspdfkit-cordova-ios`
2. Open your Xcode project or workspace and remove `PSPDFKit.framework` and `PSPDFKitUI.framework` from your Target's embedded frameworks.

![remove-frameworks](screenshots/remove-frameworks.png)

3. Close your Xcode project or workspace.
4. Integrate the new `pspdfkit-cordova` Plugin. See [Install](#install) instructions above.
5. Rename all `PSPDFKitPlugin` calls to `PSPDFKit` in your app's JavaScript code:

```diff
- PSPDFKitPlugin.setLicenseKey("YOUR KEY");
+ PSPDFKit.setLicenseKey("YOUR KEY");

- PSPDFKitPlugin.present('pdf/document.pdf', {
+ PSPDFKit.present('pdf/document.pdf', {
  pageMode: 'single',
});
```

License
------------

Copyright 2011-2019 PSPDFKit GmbH. All rights reserved.

THIS SOURCE CODE AND ANY ACCOMPANYING DOCUMENTATION ARE PROTECTED BY AUSTRIAN COPYRIGHT LAW
AND MAY NOT BE RESOLD OR REDISTRIBUTED. USAGE IS BOUND TO THE PSPDFKIT LICENSE AGREEMENT.
UNAUTHORIZED REPRODUCTION OR DISTRIBUTION IS SUBJECT TO CIVIL AND CRIMINAL PENALTIES.

You need a commercial license to use this project. Contact sales@pspdfkit.com for details.

## Contributing
  
Please ensure [you signed our CLA](https://pspdfkit.com/guides/web/current/miscellaneous/contributing/) so we can accept your contributions.
