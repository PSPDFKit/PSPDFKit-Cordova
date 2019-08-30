package com.pspdfkit.cordova.action.cache;

import androidx.annotation.NonNull;

import com.pspdfkit.PSPDFKit;
import com.pspdfkit.annotations.Annotation;
import com.pspdfkit.annotations.AnnotationProvider;
import com.pspdfkit.cordova.CordovaPdfActivity;
import com.pspdfkit.cordova.PSPDFKitPlugin;
import com.pspdfkit.cordova.action.BasicAction;
import com.pspdfkit.document.PdfDocument;
import com.pspdfkit.ui.PdfFragment;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;

import io.reactivex.Completable;
import io.reactivex.schedulers.Schedulers;

/**
 * Removes the cache for specified page number.
 */
public class RemoveCacheForPageAction extends BasicAction {

  private static final int ARG_PAGE_INDEX = 0;

  public RemoveCacheForPageAction(@NonNull String name, @NonNull PSPDFKitPlugin plugin) {
    super(name, plugin);
  }

  @Override
  protected void execAction(JSONArray args, CallbackContext callbackContext) throws JSONException {
    final int pageIndex = args.getInt(ARG_PAGE_INDEX);
    CordovaPdfActivity pdfActivity = CordovaPdfActivity.getCurrentActivity();

    final PdfDocument document = pdfActivity.getDocument();
    if (document != null) {
      pdfActivity.addSubscription(
          Completable.fromAction(() -> document.invalidateCacheForPage(pageIndex))
              .subscribeOn(Schedulers.io())
              .subscribe(
                  callbackContext::success,
                  e -> callbackContext.error(e.getMessage())
              )
      );
    } else {
      callbackContext.error("No document is set");
    }
  }
}
