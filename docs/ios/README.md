# Cordova Plugin for PSPDFKit for iOS

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

Follow [these steps to install PSPDFKit-Cordova](https://pspdfkit.com/getting-started/cordova/?cordova-platform=ios&project=existing-project) in your Cordova project.

## Ionic Installation

Follow [these steps to install PSPDFKit-Cordova](https://pspdfkit.com/getting-started/ionic/?ionic-platform=ios&project=existing-project) in your Ionic project.

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

## Getting Started

### New Cordova Project

Follow [these steps to install PSPDFKit-Cordova](https://pspdfkit.com/getting-started/cordova/?cordova-platform=ios&project=new-project) in a newly created Cordova project.

### Running the PSPDFKit-Demo Cordova Example

Follow [these steps to run the PSPDFKit-Demo](https://pspdfkit.com/getting-started/cordova/?cordova-platform=ios&project=clone-github-project) Cordova example project.

### New Ionic Project

Follow [these steps to install PSPDFKit-Cordova](https://pspdfkit.com/getting-started/ionic/?ionic-platform=android&project=new-project) in a newly created Ionic project.

### Running the PSPDFKit-Demo Ionic Example

Follow [these steps to run the PSPDFKit-Demo](https://pspdfkit.com/getting-started/ionic/?ionic-platform=android&project=clone-github-project) Ionic example project.

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
+ platform :ios, '13.0'
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
