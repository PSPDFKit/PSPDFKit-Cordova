package com.pspdfkit.cordova.action.form;

import androidx.annotation.NonNull;

import com.pspdfkit.annotations.Annotation;
import com.pspdfkit.annotations.AnnotationProvider;
import com.pspdfkit.cordova.CordovaPdfActivity;
import com.pspdfkit.cordova.PSPDFKitPlugin;
import com.pspdfkit.cordova.action.BasicAction;
import com.pspdfkit.document.PdfDocument;
import com.pspdfkit.forms.ChoiceFormElement;
import com.pspdfkit.forms.ComboBoxFormElement;
import com.pspdfkit.forms.EditableButtonFormElement;
import com.pspdfkit.forms.FormElement;
import com.pspdfkit.forms.TextFormElement;
import com.pspdfkit.ui.PdfFragment;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.List;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;

/**
 * Adds a new annotation to the current document using the Instant JSON Annotation payload:
 * https://pspdfkit.com/guides/ios/current/importing-exporting/instant-json/#instant-annotation-json-api
 */
public class SetFormFieldValueAction extends BasicAction {

  private static final int ARG_FORM_FIELD_NAME = 0;
  private static final int ARG_FORM_FIELD_NEW_VALUE = 0;

  public SetFormFieldValueAction(@NonNull String name, @NonNull PSPDFKitPlugin plugin) {
    super(name, plugin);
  }

  @Override
  protected void execAction(JSONArray args, CallbackContext callbackContext) throws JSONException {
    String formElementName = args.getString(ARG_FORM_FIELD_NAME);
    String value = args.getString(ARG_FORM_FIELD_NEW_VALUE);

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
            if (formElement instanceof TextFormElement) {
              TextFormElement textFormElement = (TextFormElement) formElement;
              textFormElement.setText(value);
            } else if (formElement instanceof EditableButtonFormElement) {
              EditableButtonFormElement editableButtonFormElement = (EditableButtonFormElement) formElement;
              if (value.equalsIgnoreCase("selected")) {
                editableButtonFormElement.select();
              } else if (value.equalsIgnoreCase("deselected")) {
                editableButtonFormElement.deselect();
              }
            } else if (formElement instanceof ChoiceFormElement) {
              ChoiceFormElement choiceFormElement = (ChoiceFormElement) formElement;
              try {
                int selectedIndex = Integer.parseInt(value);
                List<Integer> selectedIndices = new ArrayList<>();
                selectedIndices.add(selectedIndex);
                choiceFormElement.setSelectedIndexes(selectedIndices);
              } catch (NumberFormatException e) {
                try {
                  // Maybe it's multiple indices.
                  JSONArray indices = new JSONArray(value);
                  List<Integer> selectedIndices = new ArrayList<>();
                  for (int i = 0; i < indices.length(); i++) {
                    selectedIndices.add(indices.getInt(i));
                  }
                  choiceFormElement.setSelectedIndexes(selectedIndices);
                }catch (JSONException ex) {
                  // This isn't an index maybe we can set a custom value on a combobox.
                  if (formElement instanceof ComboBoxFormElement) {
                    ((ComboBoxFormElement) formElement).setCustomText(value);
                  }
                }
              }
            }
          })
      );
    } else {
      callbackContext.error("No document is set");
    }
  }
}
