package com.pspdfkit.cordova.action;

import android.content.Intent;

import com.pspdfkit.PSPDFKit;
import com.pspdfkit.cordova.CordovaPdfActivity;
import com.pspdfkit.cordova.PSPDFKitPlugin;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

/**
 * Action to set a license key.
 */
public class LicenseKeyAction extends BasicAction {

  private static final int ARG_LICENSE_KEY = 0;

  public LicenseKeyAction(@NonNull String name, @NonNull PSPDFKitPlugin plugin) {
    super(name, plugin);
  }

  @Override
  protected void execAction(JSONArray args, CallbackContext callbackContext) throws JSONException {
    final String licenseKey = args.getString(ARG_LICENSE_KEY);
    this.getPlugin().setLicenseKey(licenseKey);
    callbackContext.success();
  }
}
