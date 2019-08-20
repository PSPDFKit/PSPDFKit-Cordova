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
var platform = window.cordova.platformId;

/**
 * Event channels
 * 
 * __Supported Platforms__
 * 
 * -Android
 */
var channel = require("cordova/channel");

var channels = {
  onDocumentSaved: channel.create("onDocumentSaved"),
  onDocumentSaveFailed: channel.create("onDocumentSaveFailed"),
  onDocumentDismissed: channel.create("onDocumentDismissed")
};

/**
 * Retrieves total number of handlers for all available channels.
 * 
 * __Supported Platforms__
 * 
 * -Android
 */
function numberOfHandlers() {
  return (
    channels.onDocumentSaved.numHandlers +
    channels.onDocumentSaveFailed.numHandlers +
    channels.onDocumentDismissed.numHandlers
  );
}

/**
 * Notifies about any changes to collection of event handlers.
 * 
 * __Supported Platforms__
 * 
 * -Android
 */
function onEventSubscribersChanged() {
  console.log("event subscribers changed");
  // If we just registered the first handler, make sure native listener is started.
  if (this.numHandlers === 1 && numberOfHandlers() === 1) {
    console.log("connecting event channel");
    exec(
      function(info) {
        console.log("Received event", info);
        channels[info.eventType].fire(info.data);
      },
      function() {
        console.log("Error while receiving event.");
      },
      "PSPDFKitCordovaPlugin",
      "startEventDispatching",
      []
    );
  } else if (numberOfHandlers() === 0) {
    console.log("disconnecting event channel");
    exec(null, null, "PSPDFKitCordovaPlugin", "stopEventDispatching", []);
  }
}

for (var key in channels) {
  console.log("subscriber listener for " + key);
  channels[key].onHasSubscribersChange = onEventSubscribersChanged;
}

/**
 * Retrieves a named property from the given target object while removing the property from the object.
 * 
 * __Supported Platforms__
 * 
 * -Android
 */
function getPropertyAndUnset(target, name) {
  var value = target.hasOwnProperty(name) ? target[name] : null;
  delete target[name];
  return value;
}

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
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
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
 * -Android
 */
exports.present = function(path, options, callback) {
  if (platform === "ios") {
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
  } else if (platform === "android") {
    options = options || {};
    var password = getPropertyAndUnset(options, "password");
    exec(success, error, "PSPDFKitCordovaPlugin", "showDocument", [
      uri,
      options,
      password
    ]);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
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
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
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
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
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
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
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
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
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
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
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
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
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

/**
 * Subscribes listener for given event type.
 */
exports.addEventListener = function(type, listener) {
  if (platform === "ios") {
    var existing = listeners[type];
    if (!existing) {
      existing = [];
      listeners[type] = existing;
    }
    existing.push(listener);
  } else if (platform === "android") {
    if (type in channels) {
      channels[type].subscribe(listener);
    }
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

exports.addEventListeners = function(listeners) {
  for (type in listeners) {
    exports.addEventListener(type, listeners[type]);
  }
};

/**
 * Unsubscribes listener for given event type.
 */
exports.removeEventListener = function(type, listener) {
  if (platform === "ios") {
    var existing = listeners[type];
    if (existing) {
      var index;
      while ((index = existing.indexOf(listener)) != -1) {
        existing.splice(index, 1);
      }
    }
  }  else if (platform === "android") {
    if (type in channels) {
      channels[type].unsubscribe(listener);
    }
  } else {
    console.log("Not implemented on " + platform + ".");
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
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
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
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
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
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
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
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

// Page scrolling

exports.setPage = function(page, animated, callback) {
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

exports.getPage = function(callback) {
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

exports.getScreenPage = function(callback) {
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

exports.getPageCount = function(callback) {
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

exports.scrollToNextPage = function(animated, callback) {
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

exports.scrollToPreviousPage = function(animated, callback) {
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

// Appearance
exports.setAppearanceMode = function(appearanceMode, callback) {
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

// Cache

exports.clearCache = function(callback) {
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

exports.removeCacheForPresentedDocument = function(callback) {
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

// Toolbar
var leftBarButtonItems = ["close"];
var rightBarButtonItems = ["search", "outline", "thumbnails"];

exports.dispatchLeftBarButtonAction = function(index) {
  if (platform === "ios") {
    leftBarButtonItems[index].action();
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

exports.dispatchRightBarButtonAction = function(index) {
  rightBarButtonItems[index].action();
};

exports.setLeftBarButtonItems = function(items) {
  if (platform === "ios") {
    leftBarButtonItems = items;
    exec(
      function(result) {},
      function(error) {},
      "PSPDFKitPlugin",
      "setLeftBarButtonItems",
      [items]
    );
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

exports.setRightBarButtonItems = function(items) {
  if (platform === "ios") {
    rightBarButtonItems = items;
    exec(
      function(result) {},
      function(error) {},
      "PSPDFKitPlugin",
      "setRightBarButtonItems",
      [items]
    );
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

exports.getLeftBarButtonItems = function(callback) {
  if (platform === "ios") {
    callback(leftBarButtonItems);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

exports.getRightBarButtonItems = function(callback) {
  if (platform === "ios") {
    callback(rightBarButtonItems);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

// Annotation toolbar

exports.hideAnnotationToolbar = function(callback) {
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

exports.showAnnotationToolbar = function(callback) {
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

exports.toggleAnnotationToolbar = function(callback) {
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
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
 * -Android
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
 * -Android
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
 * -Android
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
 * -Android
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
 * -Android
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
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

exports.getFormFieldValue = function(fullyQualifiedName, callback) {
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
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
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
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
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};
