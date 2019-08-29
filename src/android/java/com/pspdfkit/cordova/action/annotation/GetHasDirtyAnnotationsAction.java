package com.pspdfkit.cordova.action.annotation;

import androidx.annotation.NonNull;

import com.pspdfkit.cordova.CordovaPdfActivity;
import com.pspdfkit.cordova.PSPDFKitPlugin;
import com.pspdfkit.cordova.action.BasicAction;
import com.pspdfkit.document.PdfDocument;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Returns true in the success (or result) callback if the document has unsaved annotation. Returns false otherwise.
 */
public class GetHasDirtyAnnotationsAction extends BasicAction {

  public GetHasDirtyAnnotationsAction(@NonNull String name, @NonNull PSPDFKitPlugin plugin) {
    super(name, plugin);
  }

  @Override
  protected void execAction(JSONArray args, CallbackContext callbackContext) throws JSONException {
    final PdfDocument document = CordovaPdfActivity.getCurrentActivity().getDocument();

    if (document != null) {
      final boolean wasModified = document.wasModified();
      final JSONObject response = new JSONObject();
      response.put("wasModified", wasModified);
      callbackContext.success(response);
    } else {
      callbackContext.error("No document is set");
    }
  }
}
