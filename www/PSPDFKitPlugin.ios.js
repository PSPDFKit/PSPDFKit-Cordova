//
//  PSPDFPlugin.ios.js
//  Plugin for PSPDFKit for Apache Cordova
//
//  Copyright © 2013-2019 PSPDFKit GmbH. All rights reserved.
//
//  THIS SOURCE CODE AND ANY ACCOMPANYING DOCUMENTATION ARE PROTECTED BY AUSTRIAN COPYRIGHT LAW
//  AND MAY NOT BE RESOLD OR REDISTRIBUTED. USAGE IS BOUND TO THE PSPDFKIT LICENSE AGREEMENT.
//  UNAUTHORIZED REPRODUCTION OR DISTRIBUTION IS SUBJECT TO CIVIL AND CRIMINAL PENALTIES.
//  This notice may not be removed from this file.
//

var exec = require("cordova/exec");

// License key

/**
 * Activates PSPDFKit with your license key from https://customers.pspdfkit.com.
 *
 * @param key The license key.
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.setLicenseKey = function(key, callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "setLicenseKey",
    [key]
  );
};

// Document methods

/**
 * Displays a PDF in a full-screen modal.
 *
 * @param html HTML string.
 * @param path The path should be a string containing the file path (not URL) for the PDF. Relative paths are assumed to be relative to the www directory (if the path has a different base URL set, this will be ignored). To specify a path inside the application documents or library directory, use a `~`, e.g. `"~/Documents/mypdf.pdf"` or `"~/Library/Application Support/mypdf.pdf"`. Path can be null, but must not be omitted
 * @param options The `options` parameter is an optional object containing configuration properties for the PDF document and/or view controller. All currently supported values are listed below under Options.
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.present = function(path, options, callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "present",
    [path, options]
  );
};

/**
 * Displays a PDF in a full-screen modal and imports annotations from a given XFDF file.
 *
 * @param html HTML string.
 * @param path Should be a string containing the file path (not URL) for the PDF. Relative paths are assumed to be relative to the www directory (if the path has a different base URL set, this will be ignored). To specify a path inside the application documents or library directory, use a `~`, e.g. `"~/Documents/mypdf.pdf"` or `"~/Library/Application Support/mypdf.pdf"`. Path can be null, but must not be omitted
 * @param path should be a string containing the file path (not URL) for the XFDF file backing the PDF document. Relative paths are assumed to be relative to the www directory (if the xfdf path has a different base URL set, we will create an XFDF file in `'"~/Documents/" + xfdfPath'`). To specify a path inside the application documents or library directory, use a ~, e.g. `"~/Documents/myXFDF.xfdf"` or `"~/Library/Application Support/myXFDF.xfdf"`. The xfdfPath cannot be null and must not be omitted.
 * @param options The `options` parameter is an optional object containing configuration properties for the PDF document and/or view controller. All currently supported values are listed below under Options.
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.presentWithXFDF = function(path, xfdfPath, callback, options) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "presentWithXFDF",
    [path, xfdfPath, options]
  );
};

/** Dismisses the modally presented PDF view.
 *
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.dismiss = function(callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "dismiss",
    []
  );
};

/** Reloads the current PDF.
 *
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.reload = function(callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "reload",
    []
  );
};

/** Triggers a search for the specified query text.
 *
 * @param query Search Term to query
 * @param animated Optional argument determines if the search should be animated (if omitted, the search will not be animated). The optional headless argument determines whether the search UI should be disaplyed (if omitted, the search UI *will* be displayed).
 * @param headless )ptional argument determines whether the search UI should be disaplyed (if omitted, the search UI *will* be displayed).
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.search = function(query, animated, headless, callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "search",
    [query, animated, headless]
  );
};

/** Saves any changed annotations in the current document.
 *
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.saveAnnotations = function(callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "saveAnnotations",
    []
  );
};

/** Return true in the success (or result) callback if the document has unsaved annotation. Returns false otherwise.
 *
 * @callback callback Success (or result) and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.getHasDirtyAnnotations = function(callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "getHasDirtyAnnotations",
    []
  );
};

// Events
var listeners = {};

exports.dispatchEvent = function(event) {
  var result = undefined;
  var functions = listeners[event.type];
  if (functions) {
    for (var i = 0; i < functions.length; i++) {
      result = functions[i](event);
      if (typeof result != "undefined") {
        if (!result) return result;
      }
    }
  }
  return result;
};

exports.addEventListener = function(type, listener) {
  var existing = listeners[type];
  if (!existing) {
    existing = [];
    listeners[type] = existing;
  }
  existing.push(listener);
};

exports.addEventListeners = function(listeners) {
  for (type in listeners) {
    exports.addEventListener(type, listeners[type]);
  }
};

exports.removeEventListener = function(type, listener) {
  var existing = listeners[type];
  if (existing) {
    var index;
    while ((index = existing.indexOf(listener)) != -1) {
      existing.splice(index, 1);
    }
  }
};

// Configuration

/**
 * Sets multiple document and view controller settings at once.
 *
 * @param options The options set will be applied to the current document (if there is one) as well as all subsequently displayed documents. All currently supported values are listed below under Options.
 * @param animated determines if the property should be animated. Not all property changes can be animated, so if the property does not support animation the animated argument will be ignored.
 * @callback callback Success (or result) and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.setOptions = function(options, animated, callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "setOptions",
    [options, animated]
  );
};

/**
 * Gets several document or view controller options in a single call.
 *
 * @param options array of option names
 * @callback callback Success (or result) and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.getOptions = function(names, callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "getOptions",
    [names]
  );
};

/**
 * Sets a single document or view controller settings at once.
 *
 * @param name the option name
 * @param value the option value
 * @param animated determines if the property should be animated. Not all property changes can be animated, so if the property does not support animation the animated argument will be ignored.
 * @callback callback Success (or result) and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.setOption = function(name, value, animated, callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "setOption",
    [name, value, animated]
  );
};

/**
 * Gets a single document or view controller settings at once.
 *
 * @param name the option name
 * @callback callback Success (or result) and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.getOption = function(name, callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "getOption",
    [name]
  );
};

// Page scrolling

exports.setPage = function(page, animated, callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "setPage",
    [page, animated]
  );
};

exports.getPage = function(callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "getPage",
    []
  );
};

exports.getScreenPage = function(callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "getScreenPage",
    []
  );
};

exports.getPageCount = function(callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "getPageCount",
    []
  );
};

exports.scrollToNextPage = function(animated, callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "scrollToNextPage",
    [animated]
  );
};

exports.scrollToPreviousPage = function(animated, callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "scrollToPreviousPage",
    [animated]
  );
};

// Appearance
exports.setAppearanceMode = function(appearanceMode, callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "setAppearanceMode",
    [appearanceMode]
  );
};

// Cache

exports.clearCache = function(callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "clearCache",
    []
  );
};

exports.removeCacheForPresentedDocument = function(callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "removeCacheForPresentedDocument",
    []
  );
};

// Toolbar
var leftBarButtonItems = ["close"];
var rightBarButtonItems = ["search", "outline", "thumbnails"];

exports.dispatchLeftBarButtonAction = function(index) {
  leftBarButtonItems[index].action();
};

exports.dispatchRightBarButtonAction = function(index) {
  rightBarButtonItems[index].action();
};

exports.setLeftBarButtonItems = function(items) {
  leftBarButtonItems = items;
  exec(
    function(result) {},
    function(error) {},
    "PSPDFKitPlugin",
    "setLeftBarButtonItems",
    [items]
  );
};

exports.setRightBarButtonItems = function(items) {
  rightBarButtonItems = items;
  exec(
    function(result) {},
    function(error) {},
    "PSPDFKitPlugin",
    "setRightBarButtonItems",
    [items]
  );
};

exports.getLeftBarButtonItems = function(callback) {
  callback(leftBarButtonItems);
};

exports.getRightBarButtonItems = function(callback) {
  callback(rightBarButtonItems);
};

// Annotation toolbar

exports.hideAnnotationToolbar = function(callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "hideAnnotationToolbar",
    []
  );
};

exports.showAnnotationToolbar = function(callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "showAnnotationToolbar",
    []
  );
};

exports.toggleAnnotationToolbar = function(callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "toggleAnnotationToolbar",
    []
  );
};

// Instant JSON

/**
 * Applies the passed in document Instant JSON.
 *
 * @param annotations The document Instant JSON to apply.
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.applyInstantJSON = function(jsonValue, callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "applyInstantJSON",
    [jsonValue]
  );
};

/**
 * Adds a new annotation to the current document using the Instant JSON Annotation
 * payload - https://pspdfkit.com/guides/ios/current/importing-exporting/instant-json/#instant-annotation-json-api
 *
 * @param jsonAnnotation Instant JSON of the annotation to add.
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.addAnnotation = function(jsonAnnotation, callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "addAnnotation",
    [jsonAnnotation]
  );
};

/**
 * Removes a given annotation from the current document.  The annotaion is expected to be in Instant
 * JSON format - https://pspdfkit.com/guides/ios/current/importing-exporting/instant-json/#instant-annotation-json-api
 *
 * @param jsonAnnotation Instant JSON of the annotation to remove.
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.removeAnnotation = function(jsonAnnotation, callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "removeAnnotation",
    [jsonAnnotation]
  );
};

/**
 * Gets all annotations of the given type from the page.
 *
 * @param pageIndex The page to get the annotations for.
 * @param type The type of annotations to get (See here for types https://pspdfkit.com/guides/server/current/api/json-format/) or `null` to get all annotations.
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.getAnnotations = function(pageIndex, type, callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "getAnnotations",
    [pageIndex, type]
  );
};

/**
 * Gets all unsaved changes to annotations.
 *
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.getAllUnsavedAnnotations = function(callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "getAllUnsavedAnnotations",
    []
  );
};

// Forms
exports.setFormFieldValue = function(value, fullyQualifiedName, callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "setFormFieldValue",
    [value, fullyQualifiedName]
  );
};

exports.getFormFieldValue = function(fullyQualifiedName, callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "getFormFieldValue",
    [fullyQualifiedName]
  );
};

// XFDF

/**
 * Imports all annotations from the specified XFDF file to the current document.
 *
 * @param xfdfFile XFDF file path to import annotations
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.importXFDF = function(xfdfPath, callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "importXFDF",
    [xfdfPath]
  );
};

/**
 * Exports all annotations from the current document to the specified XFDF file path.
 *
 * @param xfdfFile XFDF file path to export annotations
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.exportXFDF = function(xfdfPath, callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "exportXFDF",
    [xfdfPath]
  );
};

// Document Processing
exports.processAnnotations = function(
  annotationChange,
  processedDocumentPath,
  callback,
  annotationType
) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "processAnnotations",
    [annotationChange, processedDocumentPath, annotationType]
  );
};

// PDF Generation method

/**
 * Generates a PDF document from HTML string.
 *
 * @param html HTML string.
 * @param fileName File name of the generated PDF.
 * @param options Options to be considered when converting the HTML string to PDF.
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.convertPDFFromHTMLString = function(html, fileName, options, callback) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    "convertPDFFromHTMLString",
    [html, fileName, options]
  );
};
