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

// Event listeners

/** 
 * Event listeners collection.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
var listeners = {};

exports.dispatchEvent = function(event) {  
  if (platform === "ios") {
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
  } else {
    console.log("Not implemented on " + platform + ".");
    return undefined;
  }
};

/**
 * Subscribes listener for given event type.
 * 
 * __Supported Platforms__
 *
 * -iOS
 * -Android
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

/**
 * Subscribes listeners to their event types.
 * 
 * __Supported Platforms__
 *
 * -iOS
 * -Android
 */
exports.addEventListeners = function(listeners) {
  if (platform === "ios" || platform === "android") {
    for (type in listeners) {
      exports.addEventListener(type, listeners[type]);
    }
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/**
 * Unsubscribes listener for given event type.
 * 
 * __Supported Platforms__
 *
 * -iOS
 * -Android
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

/**
 * Event channels.
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
      "PSPDFKitPlugin",
      "startEventDispatching",
      []
    );
  } else if (numberOfHandlers() === 0) {
    console.log("disconnecting event channel");
    exec(null, null, "PSPDFKitPlugin", "stopEventDispatching", []);
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

/**
 * Executes action with givin parameters and handles callback result.
 * 
 * __Supported Platforms__
 * 
 * -Android
 * -iOS
 */
function executeAction(callback, action, params) {
  exec(
    function(success) {
      if (callback) callback(success, null);
    },
    function(error) {
      console.log(error);
      if (callback) callback(null, error);
    },
    "PSPDFKitPlugin",
    action,
    params
  );
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
    executeAction(callback, "setLicenseKey", [key])
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

// Showing and dismissing PDF

/**
 * iOS: Displays a PDF in a full-screen modal.
 * Android: Opens the PSPDFActivity to show a document from the local device file system.
 *
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
    executeAction(callback, "present", [path, options]);
  } else if (platform === "android") {
    options = options || {};
    var password = getPropertyAndUnset(options, "password");
    executeAction(callback, "showDocument", [path, options, password]);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/**
 * Opens the PSPDFActivity to show a document from the app's assets folder. This method copies the 
 * file to the internal app directory on the device before showing it.
 *
 * @param assetFile Relative path within the app's assets folder.
 * @param options   PSPDFKit configuration options.
 * @callback callback Success and error callback function.
 * 
 * __Supported Platforms__
 *
 * -Android
 */
exports.presentFromAssets = function(assetFile, options, callback) {
  if (platform === "android") {
    options = options || {};
    var password = getPropertyAndUnset(options, "password");
    executeAction(callback, "showDocumentFromAssets", [assetFile, options, password]);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/**
 * Displays a PDF in a full-screen modal and imports annotations from a given XFDF file.
 *
 * @param path Should be a string containing the file path (not URL) for the PDF. Relative paths are assumed to be relative to the www directory (if the path has a different base URL set, this will be ignored). To specify a path inside the application documents or library directory, use a `~`, e.g. `"~/Documents/mypdf.pdf"` or `"~/Library/Application Support/mypdf.pdf"`. Path can be null, but must not be omitted
 * @param xfdfPath should be a string containing the file path (not URL) for the XFDF file backing the PDF document. Relative paths are assumed to be relative to the www directory (if the xfdf path has a different base URL set, we will create an XFDF file in `'"~/Documents/" + xfdfPath'`). To specify a path inside the application documents or library directory, use a ~, e.g. `"~/Documents/myXFDF.xfdf"` or `"~/Library/Application Support/myXFDF.xfdf"`. The xfdfPath cannot be null and must not be omitted.
 * @param options The `options` parameter is an optional object containing configuration properties for the PDF document and/or view controller. All currently supported values are listed below under Options.
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.presentWithXFDF = function(path, xfdfPath, callback, options) {
  if (platform === "ios") {
    executeAction(callback, "presentWithXFDF", [path, xfdfPath, options]);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/** 
 * iOS: Dismisses the modally presented PDF view.
 * 
 * Android: Dismisses any previously launched PDF activity. Calls the optional callback function after all activities have been dismissed.
 *
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 * -Android
 */
exports.dismiss = function(callback) {
  if (platform === "ios" || platform === "android") {
    executeAction(callback, "dismiss", []);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/** 
 * Reloads the current PDF.
 *
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.reload = function(callback) {
  if (platform === "ios") {
    executeAction(callback, "reload", []);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

// Saving

/**
 * Saves the document to original location if it has been changed. If there were no changes to the
 * document, the document file will not be modified.
 * Provides "wasModified" as a part of a successful response which will be equal to {@code true} if
 * the file was modified and changes were saved. {@code false} if there was nothing to save.
 *
 * @callback callback Success and error callback function.
 * 
 * __Supported Platforms__
 *
 * -Android
 */
exports.saveDocument = function(success, error) {
  if (platform === "android") {
   executeAction(callback, "saveDocument", []);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/** 
 * Saves any changed annotations in the current document.
 *
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.saveAnnotations = function(callback) {
  if (platform === "ios") {
    executeAction(callback, "saveAnnotations", []);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/** 
 * Return true in the success (or result) callback if the document has unsaved annotation. Returns false otherwise.
 *
 * @callback callback Success (or result) and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.getHasDirtyAnnotations = function(callback) {
  if (platform === "ios") {
    executeAction(callback, "getHasDirtyAnnotations", []);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

// Search

/** 
 * Triggers a search for the specified query text.
 *
 * @param query Search Term to query
 * @param animated Optional argument. Determines if the search should be animated (if omitted, the search will not be animated). The optional headless argument determines whether the search UI should be disaplyed (if omitted, the search UI *will* be displayed).
 * @param headless Optional argument. Determines whether the search UI should be disaplyed (if omitted, the search UI *will* be displayed).
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.search = function(query, animated, headless, callback) {
  if (platform === "ios") {
    executeAction(callback, "search", []);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

// Document presentation options.

/**
 * Constant values used for setting the `scrollMode` option.
 * 
 * __Supported Platforms__
 *
 * -Android
 */
exports.ScrollMode = {
  /**
   * Paginated scrolling, will always snap to a page when user stops dragging or flinging.
   */
  PER_PAGE: "PER_PAGE",

  /**
   * Continuous/smooth scrolling, will stop in whatever position the user stopped dragging.
   */
  CONTINUOUS: "CONTINUOUS"
};

/**
 * Constant values used for setting the 'pageFitMode' option.
 * 
 * __Supported Platforms__
 *
 * -Android
 */
exports.PageFitMode = {
  /**
   * Fit the into the screen.
   */
  FIT_TO_SCREEN: "FIT_TO_SCREEN",

  /**
   * Scale the page to fill the screen width (if possible).
   */
  FIT_TO_WIDTH: "FIT_TO_WIDTH"
};

/**
 * Constant values used for setting the 'pageDirection' option.
 * 
 * __Supported Platforms__
 *
 * -Android
 */
exports.PageScrollDirection = {
  /**
   * Scroll horizontally.
   */
  HORIZONTAL: "HORIZONTAL",

  /**
   * Scroll vertically.
   */
  VERTICAL: "VERTICAL"
};

/**
 * Constant values used for setting the 'searchType' option.
 * 
 * __Supported Platforms__
 *
 * -Android
 */
exports.SearchType = {
  /**
   * Modular search window.
   */
  SEARCH_MODULAR: "SEARCH_MODULAR",

  /**
   * Inline search (in action bar).
   */
  SEARCH_INLINE: "SEARCH_INLINE"
};

/**
 * Constant values used for setting the 'thumbnailBarMode' option.
 * 
 * __Supported Platforms__
 *
 * -Android
 */
exports.ThumbnailBarMode = {
  /**
   * Default (static) thumbnail bar.
   */
  THUMBNAIL_BAR_MODE_DEFAULT: "THUMBNAIL_BAR_MODE_DEFAULT",
  /**
   * Scrollable thumbnail bar.
   */
  THUMBNAIL_BAR_MODE_SCROLLABLE: "THUMBNAIL_BAR_MODE_SCROLLABLE",
  /**
   * No thumbnail bar.
   */
  THUMBNAIL_BAR_MODE_NONE: "THUMBNAIL_BAR_MODE_NONE"
};

/**
 * Constant values used for setting the 'shareFeatures' option. These settings control the visibility 
 * of share actions inside the user interface.
 * 
 * __Supported Platforms__
 *
 * -Android
 */
exports.ShareFeatures = {
  /** Document sharing inside the activity. */
  DOCUMENT_SHARING: "DOCUMENT_SHARING",
  /** Sharing of embedded files (on file annotations). */
  EMBEDDED_FILE_SHARING: "EMBEDDED_FILE_SHARING",
  /** Sharing of text from selected free text annotations. */
  FREE_TEXT_ANNOTATION_SHARING: "FREE_TEXT_ANNOTATION_SHARING",
  /** Sharing of selected image annotations. */
  IMAGE_SHARING: "IMAGE_SHARING",
  /** Sharing of text from selected note annotations. */
  NOTE_ANNOTATION_SHARING: "NOTE_ANNOTATION_SHARING",
  /** Sharing of text from annotation contents or comments. */
  NOTE_EDITOR_CONTENT_SHARING: "NOTE_EDITOR_CONTENT_SHARING",
  /** Sharing of selected text. */
  TEXT_SELECTION_SHARING: "TEXT_SELECTION_SHARING"
};

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
    executeAction(callback, "setOptions", [options, animated]);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/**
 * Gets several document or view controller options in a single call.
 *
 * @param names array of option names
 * @callback callback Success (or result) and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.getOptions = function(names, callback) {
  if (platform === "ios") {
    executeAction(callback, "getOptions", [names]);
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
    executeAction(callback, "setOption", [name, value, animated]);
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
    executeAction(callback, "getOption", [name]);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

// Working with page navigation

/**
 * FIXME: Description.
 * 
 * @param page Description
 * @param animated Description
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.setPage = function(page, animated, callback) {
  if (platform === "ios") {
    executeAction(callback, "setPage", [page, animated]);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/**
 * FIXME: Description.
 * 
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.getPage = function(callback) {
  if (platform === "ios") {
    executeAction(callback, "getPage", []);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/**
 * FIXME: Description.
 * 
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.getScreenPage = function(callback) {
  if (platform === "ios") {
    executeAction(callback, "getScreenPage", []);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/**
 * FIXME: Description.
 * 
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.getPageCount = function(callback) {
  if (platform === "ios") {
    executeAction(callback, "getPageCount", []);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/**
 * FIXME: Description.
 * 
 * @param animated Description
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.scrollToNextPage = function(animated, callback) {
  if (platform === "ios") {
    executeAction(callback, "scrollToNextPage", [animated]);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/**
 * FIXME: Description.
 * 
 * @param animated Description
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.scrollToPreviousPage = function(animated, callback) {
  if (platform === "ios") {
    executeAction(callback, "scrollToPreviousPage", [animated]);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/**
 * FIXME: Description.
 * 
 * @param appearanceMode Description
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.setAppearanceMode = function(appearanceMode, callback) {
  if (platform === "ios") {
    executeAction(callback, "setAppearanceMode", [appearanceMode]);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

// Cache

/**
 * FIXME: Description.
 *
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.clearCache = function(callback) {
  if (platform === "ios") {
    executeAction(callback, "clearCache", []);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/**
 * FIXME: Description.
 *
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.removeCacheForPresentedDocument = function(callback) {
  if (platform === "ios") {
    executeAction(callback, "removeCacheForPresentedDocument", []);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

// Working with toolbars

/**
 * FIXME: Description.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
var leftBarButtonItems = ["close"];
var rightBarButtonItems = ["search", "outline", "thumbnails"];

/**
 * FIXME: Description.
 *
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.dispatchLeftBarButtonAction = function(index) {
  if (platform === "ios") {
    leftBarButtonItems[index].action();
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/**
 * FIXME: Description.
 *
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.dispatchRightBarButtonAction = function(index) {
  rightBarButtonItems[index].action();
};

/**
 * FIXME: Description.
 *
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
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

/**
 * FIXME: Description.
 *
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
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

/**
 * FIXME: Description.
 *
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.getLeftBarButtonItems = function(callback) {
  if (platform === "ios") {
    callback(leftBarButtonItems);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/**
 * FIXME: Description.
 *
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.getRightBarButtonItems = function(callback) {
  if (platform === "ios") {
    callback(rightBarButtonItems);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/**
 * FIXME: Description.
 *
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.hideAnnotationToolbar = function(callback) {
  if (platform === "ios") {
    executeAction(callback, "hideAnnotationToolbar", []);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/**
 * FIXME: Description.
 *
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.showAnnotationToolbar = function(callback) {
  if (platform === "ios") {
    executeAction(callback, "showAnnotationToolbar", []);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/**
 * FIXME: Description.
 *
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.toggleAnnotationToolbar = function(callback) {
  if (platform === "ios") {
    executeAction(callback, "toggleAnnotationToolbar", []);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

// Instant JSON

/**
 * Applies the passed in document Instant JSON.
 *
 * @param jsonValue The document Instant JSON to apply.
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 * -Android
 */
exports.applyInstantJSON = function(jsonValue, callback) {
  if (platform === "ios" || platform === "android") {
    executeAction(callback, "applyInstantJSON", [jsonValue]);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
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
  if (platform === "ios" || platform === "android") {
    executeAction(callback, "addAnnotation", [jsonAnnotation]);
  } else {
    console.log("Not implemented on " + platform + ".");
  }  
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
  if (platform === "ios" || platform === "android") {
    executeAction(callback, "removeAnnotation", [jsonAnnotation]);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
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
  if (platform === "ios" || platform === "android") {
    executeAction(callback, "getAnnotations", [pageIndex, type]);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
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
  if (platform === "ios" || platform === "android") {
    executeAction(callback, "getAllUnsavedAnnotations", []);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

// Forms

/**
 * FIXME: Description.
 *
 * @param value description.
 * @param fullyQualifiedName description.
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 * -Android
 */
exports.setFormFieldValue = function(value, fullyQualifiedName, callback) {
  if (platform === "ios" || platform === "android") {
    executeAction(callback, "setFormFieldValue", [value, fullyQualifiedName]);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/**
 * FIXME: Description.
 *
 * @param fullyQualifiedName description.
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 * -Android
 */
exports.getFormFieldValue = function(fullyQualifiedName, callback) {
  if (platform === "ios" || platform === "android") {
    executeAction(callback, "getFormFieldValue", [fullyQualifiedName]);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

// XFDF

/**
 * Imports all annotations from the specified XFDF file to the current document.
 *
 * @param xfdfPath XFDF file path to import annotations
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 * -Android
 */
exports.importXFDF = function(xfdfPath, callback) {
  if (platform === "ios" || platform === "android") {
    executeAction(callback, "importXFDF", [xfdfPath]);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

/**
 * Exports all annotations from the current document to the specified XFDF file path.
 *
 * @param xfdfPath XFDF file path to export annotations
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 * -Android
 */
exports.exportXFDF = function(xfdfPath, callback) {
  if (platform === "ios" || platform === "android") {
    executeAction(callback, "exportXFDF", [xfdfPath]);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

// Document processing

/**
 * FIXME: Description.
 *
 * @param annotationChange description.
 * @param processedDocumentPath description.
 * @param annotationType description.
 * @callback callback Success and error callback function.
 *
 * __Supported Platforms__
 *
 * -iOS
 */
exports.processAnnotations = function(
  annotationChange,
  processedDocumentPath,
  callback,
  annotationType
) {
  if (platform === "ios") {
    executeAction(callback, "processAnnotations", [annotationChange, processedDocumentPath, annotationType]);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};

// Document generation

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
    executeAction(callback, "convertPDFFromHTMLString", [html, fileName, options]);
  } else {
    console.log("Not implemented on " + platform + ".");
  }
};
