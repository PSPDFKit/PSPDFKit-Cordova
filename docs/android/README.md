# Cordova Plugin - PSPDFKit for Android 6

The [PSPDFKit SDK](https://pspdfkit.com/pdf-sdk/) is a framework that allows you to view, annotate, sign, and fill PDF forms on iOS, Android, Windows, macOS, and Web. [PSPDFKit Instant](https://pspdfkit.com/instant/) adds real-time collaboration features to seamlessly share, edit, and annotate PDF documents.

PSPDFKit comes with open source wrappers for Cordova on both [iOS](https://pspdfkit.com/guides/ios/current/other-languages/apache-cordova-phonegap/) and [Android](https://pspdfkit.com/guides/android/current/other-languages/apache-cordova-phonegap/). These wrappers also work for being used with the [Ionic](https://ionicframework.com/) framework.

This plugin defines a global `PSPDFKit` object, which provides an API for viewing PDF documents with PSPDFKit for Android.

## Cordova Requirements

- The [latest stable version of cordova-lib](https://github.com/apache/cordova-lib/releases).
- The [latest stable version of cordova-android](https://github.com/apache/cordova-android/releases).
- The [latest stable version of Android Studio](https://developer.android.com/studio).
- The [Android NDK](https://developer.android.com/studio/projects/install-ndk).
- The [latest stable version of Gradle](https://gradle.org/install).
- An [Android Virtual Device](https://developer.android.com/studio/run/managing-avds.html) or a hardware device.

## Ionic Requirements

- The [latest stable version of Node.js](https://nodejs.org/en/).
- The [latest stable version of Ionic CLI](https://ionicframework.com/docs/cli).
- The [latest stable version of `cordova-res`](https://www.npmjs.com/package/cordova-res).
- The [latest stable version of Android Studio](https://developer.android.com/studio).
- The [Android NDK](https://developer.android.com/studio/projects/install-ndk).
- The [latest stable version of Gradle](https://gradle.org/install).
- An [Android Virtual Device](https://developer.android.com/studio/run/managing-avds.html) or a hardware device.

For more information regarding the Ionic installation you can check out the [official Ionic installation guide](https://ionicframework.com/docs/v1/guide/installation.html).

## Installation

We assume that you have [an existing Cordova project](https://cordova.apache.org/#getstarted).

### Installation in a Cordova app

```shell
cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git
```

### Installation in an Ionic app

```shell
ionic cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git
```

## Usage

The plugin is accessed via the PSPDFKit singleton. Here is an example which shows the document from your `assets/www/documents` folder:

```javascript
function showMyDocument() {
  PSPDFKit.presentFromAssets("www/documents/myFile.pdf", {
    title: "My PDF Document",
    page: 4,
    scrollDirection: PSPDFKit.PageScrollDirection.VERTICAL,
    scrollMode: PSPDFKit.ScrollMode.CONTINUOUS,
    useImmersiveMode: true,
    password: "my-document-password",
  });
}
```

## PSPDFKit.present

Opens a document from the local device storage.

```javascript
PSPDFKit.present(uri, options, success, fail);
```

## PSPDFKit.presentFromAssets

Opens a document from the app's asset directory. To package a file within your app's assets, put it into the `www/documents` directory of your project.

```javascript
PSPDFKit.presentFromAssets(assetPath, options, success, fail);
```

## Options

You can use the `options` parameter to configure PSPDFKit. Here is a list of valid configuration options. You can omit option entries to use their default value, or pass in an empty options object `{}` to keep all default settings.

```javascript
var options {
    backgroundColor: '#EFEFEF', // hex-color of the page background
    disableAnnotationList: true, // hide annotation list (default: false)
    disableAnnotationNoteHinting: true, // hide small notes next to annotations that have a text set (default: false)
    disableBookmarkEditing: true, // hide bookmark editing (default: false)
    disableBookmarkList: true, // hide bookmark list (default: false)
    disableCopyPaste: true, // disable annotation copy/paste (default: false)
    disableDocumentEditor: true, // hide document editor (default: false)
    disableOutline: true, // hide the outline menu (default: false)
    disablePrinting: true, // hide option to print (default: false)
    disableUndoRedo: true, // disable undo/redo system (default: false)
    hidePageLabels: true, // hide page labels (if available in PDF) in page overlay and thumbnail grid (default: false)
    hidePageNumberOverlay: false, // hide the overlay showing the current page (default: false)
    hideSettingsMenu: false, // hide the settings menu (default: false)
    thumbnailBarMode: PSPDFKit.ThumbnailBarMode.THUMBNAIL_BAR_MODE_DEFAULT, // show static thumbnail bar. Also valid: THUMBNAIL_BAR_MODE_DEFAULT, THUMBNAIL_BAR_MODE_SCROLLABLE
    hideThumbnailGrid: false, // hide the thumbnail grid menu (default: false)
    pageFitMode: PSPDFKit.PageFitMode.FIT_TO_WIDTH, // also valid: PSPDFKit.PageFitMode.FIT_TO_SCREEN
    scrollDirection: PSPDFKit.PageScrollDirection.VERTICAL, // also valid: PSPDFKit.PageScrollDirection.HORIZONTAL
    scrollMode: PSPDFKit.ScrollMode.CONTINUOUS, // also valid: PSPDFKit.ScrollMode.PER_PAGE
    // Configures which share actions should be visible in the user interface. (default: all enabled)
    shareFeatures: [
        /** Document sharing inside the activity. */
        PSPDFKit.ShareFeatures.DOCUMENT_SHARING,
        /** Sharing of embedded files (on file annotations). */
        PSPDFKit.ShareFeatures.EMBEDDED_FILE_SHARING,
        /** Sharing of text from selected free text annotations. */
        PSPDFKit.ShareFeatures.FREE_TEXT_ANNOTATION_SHARING,
        /** Sharing of selected image annotations. */
        PSPDFKit.ShareFeatures.IMAGE_SHARING,
        /** Sharing of text from selected note annotations. */
        PSPDFKit.ShareFeatures.NOTE_ANNOTATION_SHARING,
        /** Sharing of text from annotation contents or comments. */
        PSPDFKit.ShareFeatures.NOTE_EDITOR_CONTENT_SHARING,
        /** Sharing of selected text. */
        PSPDFKit.ShareFeatures.TEXT_SELECTION_SHARING
    ],
    invertColors: false, // invert rendered colors (default: false)
    toGrayscale: true, // render document in grayscale only (default: false)
    title: "My PSPDFKit app", // title displayed in the viewer action bar
    startZoomScale: 2.0, // initial zoom value (default: 1.0)
    maxZoomScale: 10.0, // maximum zoom factor when zooming into a page (default: 15.0)
    zoomOutBounce: false, // "bounce" animation when pinch-zooming out (default: true)
    page: 2, // initial page number (default: 0, i.e. the first page)
    useImmersiveMode: true, // activate Android's immersive app mode (default: false)
    disableSearch: false, // completely deactivate document search (default: false)
    searchType: PSPDFKit.SearchType.SEARCH_MODULAR, // also valid: PSPDFKit.SearchType.SEARCH_INLINE
    autosaveEnabled: true, // automatically save document changes on exit (default: true)
    annotationEditing: {
        enabled: true, // activate annotation editing (default: true)
        creatorName: 'John Doe' // author name written into new annotations (default: null)
    },
    password: "my-document-password" // use this to open encrypted PDF files
};

PSPDFKit.presentFromAssets('www/documents/myFile.pdf', options);
```

## New Cordova Project

Let's create a minimal Corodva app that integrates PSPDFKit and uses the `pspdfkit-cordova` plugin.

### Quickstart Guide Cordova

1. Create a new Apache Cordova project from your command line using the [Apache Cordova Command-Line Interface (CLI)](https://cordova.apache.org/docs/en/5.1.1/index.html).

```shell
cordova create pdfapp com.example.pdfapp PDF-App
cd pdfapp
```

> Important: Your app's package name (in the above example `com.example.pdfapp`) has to match your PSPDFKit license name or PSPDFKit will throw an exception. If you don't have a license yet, you can request an evaluation license of PSPDFKit at https://pspdfkit.com/try.

2. PSPDFKit requires modern Jetpack libraries AndroidX. To enable AndroidX modify the `config.xml` adding the following line in the `android` section:

```diff
...
<platform name="android">
+   <preference name="AndroidXEnabled" value="true" />
    <allow-intent href="market:*" />
</platform>
...

```

2. Install the PSPDFKit plugin:

```shell
cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git
```

3. Add Android platform support to your project. This plugin requires the latest `android` plugin 8+.

```shell
cordova platform add android
```

4. Next, you need to setup your PSPDFKit license key. If you don't have a license key yet, you can get one by requesting an evaluation version of PSPDFKit at https://pspdfkit.com/try. Inside your Android app's `platforms/android/local.properties` file, specify the `pspdfkit.license` property:

```properties
# This is the LICENSE_KEY you received when requesting a demo or from the customer portal.
pspdfkit.license=LICENSE_STRING
```

> Note: If you're already a customer then please make sure that the package ID matches with your bundle ID that's assigned to your license (e.g. com.example.pdfapp). You can check this in your `AndroidManifest.xml` by searching for `package`. If you are using a trial license then you don't have to worry about that.

5. Add the PDF document you want to display in your project’s `assets` directory. You can use <a href="https://pspdfkit.com/downloads/pspdfkit-android-quickstart-guide.pdf" download="Document.pdf">this QuickStart Guide PDF</a> as an example.

```shell
cp ~/Downloads/Document.pdf platforms/android/app/src/main/assets/Document.pdf
```

6. Now open your `index.js` file located in `www/js/` and paste the below code into the `onDeviceReady()` function. For this to work you need to create a folder called `documents` in `www` and paste a PDF in this folder.

```javascript
PSPDFKit.present("Document.pdf", {
  title: "My PDF Document",
  page: 0,
  scrollDirection: PSPDFKit.PageScrollDirection.VERTICAL,
  scrollMode: PSPDFKit.ScrollMode.CONTINUOUS,
  useImmersiveMode: true,
});
```

7. [Start your emulator](https://developer.android.com/studio/run/emulator#runningemulator).
8. The app is now ready to launch:

```shell
cordova emulate android
```

## Running the PSPDFKit-Demo Cordova Example

1. Open the Terminal app and clone the GitHub repository:

```shell
git clone https://github.com/PSPDFKit/pspdfkit-cordova.git
```

2. Change the current working directory to the example project’s folder:

```shell
cd pspdfkit-cordova/examples/cordova/PSPDFKit-Demo
```

2. Install the dependencies:

```shell
npm install
```

3. Add the Android platform:

```shell
cordova platform add android
```

4. Next, you need to setup your PSPDFKit license key. If you don't have a license key yet, you can get one by requesting an evaluation version of PSPDFKit at https://pspdfkit.com/try. Inside your Android app's `platforms/android/local.properties` file, specify the `pspdfkit.license` property:

```properties
# This is the LICENSE_KEY you received when requesting a demo or from the customer portal.
pspdfkit.license=LICENSE_STRING
```

> Note: If you're already a customer then please make sure that the package ID matches with your bundle ID that's assigned to your license (e.g. com.pspdfkit.demo). You can check this in your `AndroidManifest.xml` by searching for `package`. If you are using a trial license then you don't have to worry about that.

5. Copy the PDF document from the `www` directory into your project’s assets directory:

```shell
cp www/Document.pdf platforms/android/app/src/main/assets/Document.pdf
```

6. [Start your emulator](https://developer.android.com/studio/run/emulator#runningemulator).
7. The app is now ready to launch:

```shell
cordova emulate android
```

## New Ionic Project

Let's create a minimal Ionic app that integrates PSPDFKit and uses the `pspdfkit-cordova` plugin.

### Quickstart Guide Ionic

1. Create a new Ionic project from the command line using the [Ionic Command-Line Interface (CLI)](https://ionicframework.com/docs/cli/start/) .

```shell
ionic start PSPDFKit-Demo blank --type=angular
cd PSPDFKit-Demo
```

2. Install the PSPDFKit plugin:

```shell
ionic cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git
```

3. Open `config.xml` in a text editor and enable AndroidX:

```diff
...
  <platform name="android">
-    <edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/application" xmlns:android="http://schemas.android.com/apk/res/android">
-       <application android:networkSecurityConfig="@xml/network_security_config" />
-    </edit-config>
+   <preference name="AndroidXEnabled" value="true" />
    ...
  </platform>
...
```

4. Declare PSPDFKit in the src/declarations.d.ts file:

```shell
echo "declare var PSPDFKit: any;" > src/declarations.d.ts
```

5. Open the `src/app/app.component.ts` file:

```shell
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

7. Run `ionic cordova platform add android` to add the Android platform.

8. Next, you need to set up your PSPDFKit license key. If you don't have a license key yet, you can get one by requesting an evaluation version of PSPDFKit at https://pspdfkit.com/try. Specify the `pspdfkit.license` property inside your Android app's `platforms/android/local.properties` file, create the file if it does not exist:

```properties
# This is the LICENSE_KEY you received when requesting a demo or from the customer portal.
pspdfkit.license=LICENSE_STRING
```

> Note: If you're already a customer then please make sure that the package ID matches with your bundle ID that's assigned to your license (e.g. io.ionic.starter). You can check this in your `AndroidManifest.xml` by searching for `package`. If you are using a trial license then you don't have to worry about that.

9. Add the PDF document you want to display in your project’s `assets` directory. You can use <a href="https://pspdfkit.com/downloads/pspdfkit-android-quickstart-guide.pdf" download="Document.pdf">this QuickStart Guide PDF</a> as an example.

```shell
cp ~/Downloads/Document.pdf platforms/android/app/src/main/assets/Document.pdf
```

7. [Start your emulator](https://developer.android.com/studio/run/emulator#runningemulator).
8. The app is now ready to launch:

```shell
ionic cordova emulate android
```

## Running the PSPDFKit-Demo Ionic Example

1. Open the Terminal app and clone the GitHub repository:

```shell
git clone https://github.com/PSPDFKit/pspdfkit-cordova.git
```

2. Change the current working directory to the example project’s folder:

```shell
cd pspdfkit-cordova/examples/ionic/PSPDFKit-Demo
```

2. Install the dependencies:

```shell
npm install
```

3. Add the Android platform:

```shell
ionic cordova platform add android
```

4. Next, you need to set up your PSPDFKit license key. If you don't have a license key yet, you can get one by requesting an evaluation version of PSPDFKit at https://pspdfkit.com/try. Specify the `pspdfkit.license` property inside your Android app's `platforms/android/local.properties` file, create the file if it does not exist:

```properties
# This is the LICENSE_KEY you received when requesting a demo or from the customer portal.
pspdfkit.license=LICENSE_STRING
```

> Note: If you're already a customer then please make sure that the package ID matches with your bundle ID that's assigned to your license (e.g. com.pspdfkit.ionic.starter). You can check this in your `AndroidManifest.xml` by searching for `package`. If you are using a trial license then you don't have to worry about that.

5. Copy the PDF document from the `resources` directory into your project’s assets directory:

```shell
cp resources/Document.pdf platforms/android/app/src/main/assets/
```

6. [Start your emulator](https://developer.android.com/studio/run/emulator#runningemulator).
7. The app is now ready to launch:

```shell
ionic cordova emulate android
```

## What your project structure should look like

Below is a screenshot of how the project structure should look like if it's a working project. All folders with important files that need to be adapted are open in the screenshot. If it doesn't look like this then there is a high chance that the guide wasn't properly followed which will also lead to the project not working.

```
.
├── platforms
│   ├── android
│   │   ├── app
│   │   │   └── src
│   │   │       └── main
│   │   │           └── AndroidManifest.xml
│   │   ├── pspdfkit-cordova
│   │   │   └── starter-pspdfkit.gradle
│   │   ├── gradle.properties
│   │   └── local.properties
└── www
    ├── documents
    │   └── A.pdf
    ├── index.html
    └── js
        ├── app.js     (only for Ionic)
        └── index.js   (only for Cordova)
```

## API

You can find the API documentation in [PSPDFKit.js](../../www/PSPDFKit.js).

## Troubleshooting

### Error Reporting

To get proper error reporting for JavaScript exceptions, you need to register a global error listener which will print most runtime errors to Logcat.

Put the following code snippet into `[your-project]/platforms⁩/android⁩/app⁩/src⁩/main⁩/assets⁩/⁨www⁩/js⁩/index.js`:

```javascript
window.onerror = function (msg, url, line, col, error) {
  var extra = !col ? "" : "\ncolumn: " + col;
  extra += !error ? "" : "\nerror: " + error;
  console.log(
    "ErrorReport: " + msg + "\nurl: " + url + "\nline: " + line + extra
  );
  return true;
};
```

### Conflicts with Android Support Library/AndroidX

When running `cordova build` for a project with multiple plugins installed, it can happen that you see a build error like this:

```
* What went wrong:
Execution failed for task ':app:transformClassesWithMultidexlistForDebug'.
> com.android.build.api.transform.TransformException: Error while generating the main dex list.
```

The most common cause for this error is that your Cordova/Ionic project uses plugins that haven't yet migrated to AndroidX, but still use the old Android Support Library. Here's how to work around this issue:

1. Install the [`cordova-plugin-androidx`](https://github.com/dpa99c/cordova-plugin-androidx) plugin, which will configure your project to use AndroidX.

   ```
   cordova plugin add cordova-plugin-androidx
   ```

2. Install the [`cordova-plugin-androidx-adapter`](https://github.com/dpa99c/cordova-plugin-androidx-adapter) plugin, which will enable auto-migration of all outdated Cordova plugins, so that they also use AndroidX instead of the Support Library.

   ```
   cordova plugin add cordova-plugin-androidx-adapter
   ```

3. Run `cordova build`. This will process and update all third-party plugins to use AndroidX, and will then build your project.

### PdfActivity missing in AndroidManifest.xml

In some cases, it might occur that Cordova fails adding the required `<activity/>` entry to your app's `AndroidManifest.xml`. If this is the case, you will see an error message like this when trying to show a PDF document:

```text
05-23 21:55:40.214 20912-20982/com.example.app E/PluginManager: Uncaught exception from plugin
android.content.ActivityNotFoundException: Unable to find explicit activity class {com.example.app/com.pspdfkit.ui.PdfActivity}; have you declared this activity in your AndroidManifest.xml?
at android.app.Instrumentation.checkStartActivityResult(Instrumentation.java:1854)
at android.app.Instrumentation.execStartActivity(Instrumentation.java:1545)
at android.app.Activity.startActivityForResult(Activity.java:4283)
at org.apache.cordova.CordovaActivity.startActivityForResult(CordovaActivity.java:342)
at android.app.Activity.startActivityForResult(Activity.java:4230)
at android.app.Activity.startActivity(Activity.java:4567)
at android.app.Activity.startActivity(Activity.java:4535)
at com.pspdfkit.ui.PdfActivity.showDocument(SourceFile:113)
at com.pspdfkit.cordova.PSPDFKitPlugin.showDocumentForUri(PSPDFKitPlugin.java:253)
at com.pspdfkit.cordova.PSPDFKitPlugin.showDocument(PSPDFKitPlugin.java:227)
at com.pspdfkit.cordova.PSPDFKitPlugin.execute(PSPDFKitPlugin.java:85)
at org.apache.cordova.CordovaPlugin.execute(CordovaPlugin.java:98)
at org.apache.cordova.PluginManager.exec(PluginManager.java:132)
at org.apache.cordova.CordovaBridge.jsExec(CordovaBridge.java:57)
at org.apache.cordova.engine.SystemExposedJsApi.exec(SystemExposedJsApi.java:41)
at org.chromium.base.SystemMessageHandler.nativeDoRunLoopOnce(Native Method)
at org.chromium.base.SystemMessageHandler.handleMessage(SystemMessageHandler.java:9)
at android.os.Handler.dispatchMessage(Handler.java:102)
at android.os.Looper.loop(Looper.java:158)
at android.os.HandlerThread.run(HandlerThread.java:61)
```

To fix the issue, you need to manually add following entry to your `AndroidManifest.xml`, usually located at `<your-project>/platforms/android/app/src/main/AndroidManifest.xml`:

```AndroidManifest.xml
<manifest ...>
    <application ...>
        ...

        <!-- Add this entry if it is missing inside the manifest file. -->
        <activity android:name="com.pspdfkit.ui.PdfActivity" android:theme="@style/PSPDFKit.Theme" android:windowSoftInputMode="adjustNothing" />
    </application>
</manifest>
```

The entry needs to be inside the existing `<application></application>` tags and should be added without removing any other entries that already exist. After recompiling and re-running the application, the error should be gone and PDF files should be properly displayed.

### Locking the device orientation inside a PDF

If you want to lock the device orientation to, for example, portrait mode, you can do this by specifying the `android:screenOrientation` attribute on the `PdfActivity` inside your app's `AndroidManifest.xml`. However, since Cordova will always regenerate the `AndroidManifest.xml` at build time, you can't manually change the existing activity entry in the XML.

1. Specify the extra `android:screenOrientation` attribute for `PdfActivity` inside your app's `config.xml`:

   ```xml
   <widget id="com.example.app" ...>
       ...
       <!-- Add this to the end of your configuration to set the screen orientation inside PDFs. -->
       <edit-config file="AndroidManifest.xml" mode="merge" target="/manifest/application/activity[@android:name='com.pspdfkit.ui.PdfActivity']">
           <!-- This will lock the screen orientation to portrait mode. -->
           <activity android:screenOrientation="portrait" />
       </edit-config>
   </widget>
   ```

   For the complete list of screen orientations supported by Android, check out the official Android documentation: https://developer.android.com/guide/topics/manifest/activity-element#screen

2. From the command line, run `cordova prepare` to update the `AndroidManifest.xml`.
3. Open the `platforms/android/app/src/main/AndroidManifest.xml` file and ensure that the `android:screenOrientation` attribute was properly added to the existing `PdfActivity` declaration.

### Conflict Trying to Modify Attributes

In some cases, Cordova might fail adding `pspdfkit-cordova` plugin because of clashing configuration:

```
Failed to install 'pspdfkit-cordova': Error: There was a conflict trying to modify attributes with <edit-config> in plugin pspdfkit-cordova. The conflicting plugin, ..., already modified the same attributes. The conflict must be resolved before pspdfkit-cordova can be added. You may use --force to add the plugin and overwrite the conflicting attributes.
```

You can workaround this issue by following these steps:

1. Reorder the PSPDFKit plugin inside `package.json` before other conflicting plugins:

```package.json
...
"cordova": {
    "platforms": [
      "android",
      "ios"
    ],
    "plugins": {
      "pspdfkit-cordova": {},
      "conflicting-plugin": {}
    }
  }
...
```

2. Remove platforms and plugins directories (`rm -rf platforms plugins`).
3. Run `cordova prepare` to initialize all platforms and plugins in order specified inside the `package.json`.

## Troubleshooting Ionic

### Failed Version Downgrade

Sometimes when running the app on the device again an error can occur which says:

```text
Error: adb: Command failed with exit code 1 Error output:
adb: failed to install /Users/christoph/Downloads/todo/platforms/android/app/build/outputs/apk/debug/app-debug.apk: Failure [INSTALL_FAILED_VERSION_DOWNGRADE]
```

To solve this just uninstall the existing app from your device. To be 100% sure you can got the Settings -> Apps and delete the app for all users.

### Build succeeds but it doesn't show the document on the device

Please make sure that your license key is properly set in the `AndroidManifest.xml`! You can also open a new terminal window and type `adb logcat` to see exactly what's happening on your device. When searching for "PSPDFKit" you should be able to search for the error rather easily.

### Can't find version for a specific support library

Example:

```
* What went wrong:
Could not resolve all files for configuration ':app:debugCompileClasspath'.
> Could not find support-media-compat.aar (com.android.support:support-media-compat:26.0.2).
  Searched in the following locations:
      https://jcenter.bintray.com/com/android/support/support-media-compat/26.0.2/support-media-compat-26.0.2.aar
```

Open your `platforms/android/pspdfkit-cordova/YOURAPP-pspdfkit.gradle` file and change the version. In this case changing `26.0.2` to `26.0.1` can already fix such issues because sometimes specific support library versions are not available anymore.

### PSPDFKit name not found in TypeScript app

If you are using newer versions of Ionic (for example Ionic 3 with Angular) together with the TypeScript language, you will probably see build errors similar to this:

```text
ERROR in src/app/app.component.ts(27,7): error TS2304: Cannot find name 'PSPDFKit'.
src/app/app.component.ts(30,26): error TS2304: Cannot find name 'PSPDFKit'.
src/app/app.component.ts(31,21): error TS2304: Cannot find name 'PSPDFKit'.
```

Since TypeScript is a type-safe language, and the `PSPDFKit-Cordova` plugin is written for JavaScript, you need to manually define the `PSPDFKit` type inside your application. The easiest way to do this is to add following line to your `app.components.ts` file, or any other suitable TypeScript file in your app:

```typescript
// import statements should go first

declare var PSPDFKit: any;
```

## Migration Guide from `Cordova-Android`

If you were using the old [Cordova-Android Plugin](https://github.com/PSPDFKit/Cordova-Android), please follow the steps below to migrate to this plugin:

1. Remove the old plugin: `cordova plugin remove pspdfkit-cordova-android`
2. Integrate the new `pspdfkit-cordova` Plugin. See the [Install](#install) instructions above.
3. Rename all calls showns below to their new versions in your app's JavaScript code:

```diff
- PSPDFKit.showDocument(...);
+ PSPDFKit.present(...);

- PSPDFKit.showDocumentFromAssets(...);
+ PSPDFKit.presentFromAssets(...);

- PSPDFKit.applyInstantJson(...);
+ PSPDFKit.applyInstantJSON(...);

- PSPDFKit.importXfdf(...);
+ PSPDFKit.importXFDF(...);

- PSPDFKit.exportXfdf(...);
+ PSPDFKit.exportXFDF(...);
```
