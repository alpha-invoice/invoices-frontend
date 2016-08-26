import {Component, Input} from "@angular/core";
import {Invoice} from "../models/invoice";

/**
 * Represents a single Invoice component.
 * It gets the invoiceToBeStored to be rendered by an Input variable
 * passed from the {@link InvoiceListComponent} component.
 * @class
 */
@Component({
  selector: 'invoice',
  templateUrl: 'templates/invoice.component.html'
})
export class InvoiceComponent {
  @Input() invoice: Invoice
}
