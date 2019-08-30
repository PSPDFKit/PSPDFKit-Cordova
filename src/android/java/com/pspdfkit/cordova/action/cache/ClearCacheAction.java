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
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import io.reactivex.Completable;
import io.reactivex.schedulers.Schedulers;

/**
 * Clears the entire cache. Provides option to clean disk cache as well.
 */
public class ClearCacheAction extends BasicAction {

  private static final int ARG_CLEAR_DISK_CACHE = 0;

  public ClearCacheAction(@NonNull String name, @NonNull PSPDFKitPlugin plugin){
    super(name, plugin);
  }

  @Override
  protected void execAction(JSONArray args, CallbackContext callbackContext)   {
    final boolean clearDiskCache = args.optBoolean(ARG_CLEAR_DISK_CACHE);
    final CordovaPdfActivity pdfActivity = CordovaPdfActivity.getCurrentActivity();

    // Capture the given callback and make sure it is retained in JavaScript too.
    final PluginResult result = new PluginResult(PluginResult.Status.NO_RESULT);
    result.setKeepCallback(true);
    callbackContext.sendPluginResult(result);

    pdfActivity.addSubscription(
    Completable.fromAction(() -> PSPDFKit.clearCaches(pdfActivity.getApplicationContext(), clearDiskCache))
        .subscribeOn(Schedulers.io())
        .subscribe(
            callbackContext::success,
            e -> callbackContext.error(e.getMessage())
        )
    );
  }
}
