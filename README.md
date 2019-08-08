# PSPDFKit-Cordova

The official plugin to use PSPDFKit with Apache Cordova/PhoneGap/Ionic

## Announcements

- [How to Manipulate Annotations Programmatically in Cordova](https://pspdfkit.com/blog/2019/how-to-manipulate-annotations-programmatically-in-cordova/)
- [How to Expose Native iOS APIs to Cordova](https://pspdfkit.com/blog/2019/how-to-expose-ios-api-to-cordova/)

## Installation and Integration Steps

#### Cordova

```sh
cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git
```

#### Ionic

```sh
ionic cordova plugin add https://github.com/PSPDFKit/PSPDFKit-Cordova.git
```

Please follow the step-by-step installation instructions below for:

- [Android](/docs/android#installation)
- [iOS](/docs/ios#installation)


## Getting Started

Please follow the getting started guides below:

- [New Cordova Project on Android](/docs/android#new-cordova-project)
- [New Ionic Project on Android](/docs/android#new-ionic-project)
- [New Cordova Project on iOS](/docs/ios#new-cordova-project)
- [New Ionic Project on iOS](/docs/ios#new-ionic-project)

## Usage

```javascript
// Set your license key here.
PSPDFKit.setLicenseKey("YOUR KEY");

// Show pdf with in single page mode, with a cblack background.
PSPDFKit.present("pdf/document.pdf", {
  pageMode: "single",
  backgroundColor: "black"
});

// Show a PDF document with a callback.
PSPDFKit.present("pdf/document.pdf", function() {
  alert("pdf has appeared");
});

// Scroll to page 1.
PSPDFKit.setPage(1, true);

// Get the page number.
PSPDFKit.getPage(function(page) {
  alert("Current page: " + page);
});
```

## Documentation

- [Android](/docs/android/README.md)
- [iOS](/docs/ios/README.md)

## API Reference

- [API Reference](/www/PSPDFKit.js)

## Troubleshooting

- [Android](/docs/android#troubleshooting)
- [iOS](/docs/ios#troubleshooting)

## Migration Guides

- [Migration Guide from Cordova-Android](/docs/android#migration-guide-from-cordova-android)
- [Migration Guide from Cordova-iOS](/docs/ios#migration-guide-from-cordova-ios)

## License

Copyright 2011-2019 PSPDFKit GmbH. All rights reserved.

THIS SOURCE CODE AND ANY ACCOMPANYING DOCUMENTATION ARE PROTECTED BY AUSTRIAN COPYRIGHT LAW
AND MAY NOT BE RESOLD OR REDISTRIBUTED. USAGE IS BOUND TO THE PSPDFKIT LICENSE AGREEMENT.
UNAUTHORIZED REPRODUCTION OR DISTRIBUTION IS SUBJECT TO CIVIL AND CRIMINAL PENALTIES.

You need a commercial license to use this project. Contact sales@pspdfkit.com for details.

## Contributing

Please ensure [you signed our CLA](https://pspdfkit.com/guides/web/current/miscellaneous/contributing/) so we can accept your contributions.
