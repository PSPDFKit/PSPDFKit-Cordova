package com.pspdfkit.cordova.action.annotation;

import android.net.Uri;

import androidx.annotation.NonNull;

import com.pspdfkit.annotations.AnnotationType;
import com.pspdfkit.cordova.CordovaPdfActivity;
import com.pspdfkit.cordova.PSPDFKitPlugin;
import com.pspdfkit.cordova.action.BasicAction;
import com.pspdfkit.document.PdfDocument;
import com.pspdfkit.document.processor.PdfProcessor;
import com.pspdfkit.document.processor.PdfProcessorTask;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import java.io.FileNotFoundException;
import java.io.OutputStream;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.schedulers.Schedulers;
import io.reactivex.subscribers.DisposableSubscriber;

import static com.pspdfkit.cordova.Utilities.convertJsonNullToJavaNull;
import static com.pspdfkit.cordova.Utilities.getAnnotationProcessingModeFromString;
import static com.pspdfkit.cordova.Utilities.getAnnotationTypeFromString;

/**
 * Processes annotations (embed, remove, flatten, or print) and saves the processed document to the given document path.
 */
public class ProcessAnnotationsAction extends BasicAction {

  private static final int ARG_PROCESSING_MODE = 0;
  private static final int ARG_OUTPUT_FILE_URI = 1;
  private static final int ARG_ANNOTATION_TYPE = 2;

  public ProcessAnnotationsAction(@NonNull String name, @NonNull PSPDFKitPlugin plugin) {
    super(name, plugin);
  }

  @Override
  protected void execAction(JSONArray args, CallbackContext callbackContext) throws JSONException {
    final Uri outputFileUri = Uri.parse(args.getString(ARG_OUTPUT_FILE_URI));
    final PdfProcessorTask.AnnotationProcessingMode processingMode = getAnnotationProcessingModeFromString(args.getString(ARG_PROCESSING_MODE));
    String typeString = convertJsonNullToJavaNull(args.optString(ARG_ANNOTATION_TYPE));

    final CordovaPdfActivity cordovaPdfActivity = CordovaPdfActivity.getCurrentActivity();
    final PdfDocument document = cordovaPdfActivity.getDocument();
    // Capture the given callback and make sure it is retained in JavaScript too.
    final PluginResult result = new PluginResult(PluginResult.Status.NO_RESULT);
    result.setKeepCallback(true);
    callbackContext.sendPluginResult(result);

    if (document != null) {
      PdfProcessorTask task = PdfProcessorTask.fromDocument(document);

      if (typeString != null && !typeString.isEmpty() && !"all".equalsIgnoreCase(typeString)) {
        final AnnotationType annotationType = getAnnotationTypeFromString((typeString));
        task.changeAnnotationsOfType(annotationType, processingMode);
      } else {
        task.changeAllAnnotations(processingMode);
      }

      try {
        final OutputStream outputStream = cordovaPdfActivity.getContentResolver().openOutputStream(outputFileUri);
        if (outputStream == null) {
          callbackContext.error("Failed to open output stream during annotation processing");
          return;
        }
        cordovaPdfActivity.addSubscription(
            PdfProcessor.processDocumentAsync(task, outputStream)
                .onBackpressureDrop()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribeWith(
                    new DisposableSubscriber<PdfProcessor.ProcessorProgress>() {
                      @Override
                      public void onNext(PdfProcessor.ProcessorProgress processorProgress) {
                        //no-op
                      }

                      @Override
                      public void onError(Throwable e) {
                        callbackContext.error(e.getMessage());
                      }

                      @Override
                      public void onComplete() {
                        callbackContext.success();
                      }
                    }
                ));
      } catch (FileNotFoundException exception) {
        callbackContext.error(exception.getMessage());
      }
    } else {
      callbackContext.error("No document is set");
    }
  }
}
