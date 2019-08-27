package com.pspdfkit.cordova.action.form;

import androidx.annotation.NonNull;

import com.pspdfkit.cordova.CordovaPdfActivity;
import com.pspdfkit.cordova.PSPDFKitPlugin;
import com.pspdfkit.cordova.action.BasicAction;
import com.pspdfkit.document.PdfDocument;
import com.pspdfkit.forms.ChoiceFormElement;
import com.pspdfkit.forms.ComboBoxFormElement;
import com.pspdfkit.forms.EditableButtonFormElement;
import com.pspdfkit.forms.TextFormElement;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.schedulers.Schedulers;

/**
 * Retrieves a form field value using the form fields fully qualified name.
 */
public class GetFormFieldValueAction extends BasicAction {

  private static final int ARG_FORM_FIELD_NAME = 0;
  private static final String FORM_FIELD_VALUE = "value";

  public GetFormFieldValueAction(@NonNull String name, @NonNull PSPDFKitPlugin plugin) {
    super(name, plugin);
  }

  @Override
  protected void execAction(JSONArray args, CallbackContext callbackContext) throws JSONException {
    String formElementName = args.getString(ARG_FORM_FIELD_NAME);
    CordovaPdfActivity pdfActivity = CordovaPdfActivity.getCurrentActivity();

    final PdfDocument document = pdfActivity.getDocument();

    // Capture the given callback and make sure it is retained in JavaScript too.
    final PluginResult result = new PluginResult(PluginResult.Status.NO_RESULT);
    result.setKeepCallback(true);
    callbackContext.sendPluginResult(result);

    if (document != null) {
      pdfActivity.addSubscription(
          document.getFormProvider().getFormElementWithNameAsync(formElementName)
              .subscribeOn(Schedulers.io())
              .observeOn(AndroidSchedulers.mainThread())
              .subscribe(formElement -> {
                JSONObject response = new JSONObject();
                if (formElement instanceof TextFormElement) {
                  TextFormElement textFormElement = (TextFormElement) formElement;
                  String text = textFormElement.getText();
                  if (text == null || text.isEmpty()) {
                    response.put(FORM_FIELD_VALUE, JSONObject.NULL);
                  } else {
                    response.put(FORM_FIELD_VALUE, text);
                  }
                } else if (formElement instanceof EditableButtonFormElement) {
                  EditableButtonFormElement editableButtonFormElement = (EditableButtonFormElement) formElement;
                  if (editableButtonFormElement.isSelected()) {
                    response.put(FORM_FIELD_VALUE, "selected");
                  } else {
                    response.put(FORM_FIELD_VALUE, "deselected");
                  }
                } else if (formElement instanceof ComboBoxFormElement) {
                  ComboBoxFormElement comboBoxFormElement = (ComboBoxFormElement) formElement;
                  if (comboBoxFormElement.isCustomTextSet()) {
                    response.put(FORM_FIELD_VALUE, comboBoxFormElement.getCustomText());
                  } else {
                    response.put(FORM_FIELD_VALUE, comboBoxFormElement.getSelectedIndexes());
                  }
                } else if (formElement instanceof ChoiceFormElement) {
                  response.put(FORM_FIELD_VALUE, ((ChoiceFormElement) formElement).getSelectedIndexes());
                }

                if (response.length() == 0) {
                  // No type was applicable.
                  callbackContext.error("Unsupported form field encountered");
                } else {
                  callbackContext.success(response);
                }
              }, throwable -> callbackContext.error(throwable.getMessage()), () -> callbackContext.error("Failed to get the form field value."))
      );
    } else {
      callbackContext.error("No document is set");
    }
  }
}
