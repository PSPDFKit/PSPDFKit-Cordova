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

var PSPDFKitPlugin = new (function() {
  var exec = require('cordova/exec');
	
  // Events
  var listeners = {};

  this.dispatchEvent = function(event) {
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

  this.addEventListener = function(type, listener) {
    var existing = listeners[type];
    if (!existing) {
      existing = [];
      listeners[type] = existing;
    }
    existing.push(listener);
  };

  this.addEventListeners = function(listeners) {
    for (type in listeners) {
      this.addEventListener(type, listeners[type]);
    }
  };

  this.removeEventListener = function(type, listener) {
    var existing = listeners[type];
    if (existing) {
      var index;
      while ((index = existing.indexOf(listener)) != -1) {
        existing.splice(index, 1);
      }
    }
  };

  // License key
  this.setLicenseKey = function(key, callback) {
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
  this.convertPDFFromHTMLString = function(html, fileName, options, callback) {
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
  this.present = function(path, options, callback) {
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

  this.presentWithXFDF = function(path, xfdfPath, callback, options) {
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

  this.dismiss = function(callback) {
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

  this.reload = function(callback) {
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

  this.search = function(query, animated, headless, callback) {
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

  this.saveAnnotations = function(callback) {
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

  this.getHasDirtyAnnotations = function(callback) {
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
  this.setOptions = function(options, animated, callback) {
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

  this.getOptions = function(names, callback) {
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

  this.setOption = function(name, value, animated, callback) {
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

  this.getOption = function(name, callback) {
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

  this.setPage = function(page, animated, callback) {
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

  this.getPage = function(callback) {
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

  this.getScreenPage = function(callback) {
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

  this.getPageCount = function(callback) {
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

  this.scrollToNextPage = function(animated, callback) {
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

  this.scrollToPreviousPage = function(animated, callback) {
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
  this.setAppearanceMode = function(appearanceMode, callback) {
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

  this.clearCache = function(callback) {
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

  this.removeCacheForPresentedDocument = function(callback) {
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

  this.dispatchLeftBarButtonAction = function(index) {
    leftBarButtonItems[index].action();
  };

  this.dispatchRightBarButtonAction = function(index) {
    rightBarButtonItems[index].action();
  };

  this.setLeftBarButtonItems = function(items) {
    leftBarButtonItems = items;
    exec(
      function(result) {},
      function(error) {},
      "PSPDFKitPlugin",
      "setLeftBarButtonItems",
      [items]
    );
  };

  this.setRightBarButtonItems = function(items) {
    rightBarButtonItems = items;
    exec(
      function(result) {},
      function(error) {},
      "PSPDFKitPlugin",
      "setRightBarButtonItems",
      [items]
    );
  };

  this.getLeftBarButtonItems = function(callback) {
    callback(leftBarButtonItems);
  };

  this.getRightBarButtonItems = function(callback) {
    callback(rightBarButtonItems);
  };

  // Annotation toolbar

  this.hideAnnotationToolbar = function(callback) {
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

  this.showAnnotationToolbar = function(callback) {
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

  this.toggleAnnotationToolbar = function(callback) {
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

  this.applyInstantJSON = function(jsonValue, callback) {
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

  this.addAnnotation = function(jsonAnnotation, callback) {
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

  this.removeAnnotation = function(jsonAnnotation, callback) {
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

  this.getAnnotations = function(pageIndex, type, callback) {
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

  this.getAllUnsavedAnnotations = function(callback) {
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
  this.setFormFieldValue = function(value, fullyQualifiedName, callback) {
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

  this.getFormFieldValue = function(fullyQualifiedName, callback) {
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
  this.importXFDF = function(xfdfPath, callback) {
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

  this.exportXFDF = function(xfdfPath, callback) {
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
  this.processAnnotations = function(
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
})();
module.exports = PSPDFKitPlugin;
