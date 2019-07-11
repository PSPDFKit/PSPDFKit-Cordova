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

// License key
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

// PDF Generation method
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

// Document methods
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

// Configuration
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
