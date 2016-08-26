import { Component } from '@angular/core';
import {InvoiceListComponent} from "./components/invoice-list.component";
import {InvoiceFormComponent} from "./components/invoice-form.component";

/**
 * Represents the main class from where the Angular App starts.
 * @class
 */
@Component({
  selector: 'app-root',
  templateUrl: 'templates/app.component.html',
  directives: [InvoiceListComponent, InvoiceFormComponent]
})
export class AppComponent {
}
