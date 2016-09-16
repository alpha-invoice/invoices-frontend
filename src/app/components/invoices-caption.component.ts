
import {Component, Input, EventEmitter, Output} from "@angular/core";
import {Invoice} from "../models/invoice";
@Component({
  selector: 'invoices-caption',
  templateUrl: 'templates/invoices-caption.component.html',
})
export class InvoicesCaptionComponent {
  //This is array of invoices we should print on this page
  @Input() invoices: Invoice[];
  @Output() invoiceClicked = new EventEmitter();
  @Input() page: number;
  sendInvoiceId(id) {
    this.invoiceClicked.emit(id);
  }
}

