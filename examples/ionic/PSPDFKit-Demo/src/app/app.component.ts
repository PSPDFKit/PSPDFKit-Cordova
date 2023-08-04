import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      const DOCUMENT = this.platform.is("ios")
        ? "samples/Document.pdf"
        : "file:///android_asset/www/samples/Document.pdf";
      PSPDFKit.present(DOCUMENT);
    });
  }
}
