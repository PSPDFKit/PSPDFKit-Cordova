/*
 *   Copyright (c) 2015-2022 PSPDFKit GmbH. All rights reserved.
 *
 *   THIS SOURCE CODE AND ANY ACCOMPANYING DOCUMENTATION ARE PROTECTED BY INTERNATIONAL COPYRIGHT LAW
 *   AND MAY NOT BE RESOLD OR REDISTRIBUTED. USAGE IS BOUND TO THE PSPDFKIT LICENSE AGREEMENT.
 *   UNAUTHORIZED REPRODUCTION OR DISTRIBUTION IS SUBJECT TO CIVIL AND CRIMINAL PENALTIES.
 *   This notice may not be removed from this file.
 */

package com.pspdfkit.cordova;

public class PSPDFKitPluginException extends RuntimeException {

    public PSPDFKitPluginException() {
    }

    public PSPDFKitPluginException(String detailMessage) {
        super(detailMessage);
    }

    public PSPDFKitPluginException(String detailMessage, Throwable throwable) {
        super(detailMessage, throwable);
    }

    public PSPDFKitPluginException(Throwable throwable) {
        super(throwable);
    }
}
