
import {Component, Input, EventEmitter, Output} from "@angular/core";
import {Invoice} from "../models/invoice";
@Component({
  selector: 'invoices-caption',
  template: "<a *ngFor=\"let invoice of invoices\"  (click)=\"sendInvoiceId(invoice.id)\" class=\"list-group-item\">{{invoice.id}}</a>"
})
export class InvoicesCaptionComponent {
  //This is array of invoices we should print on this page
  @Input() invoices: Invoice[];
  @Output() invoiceClicked = new EventEmitter();
  sendInvoiceId(id) {
    this.invoiceClicked.emit(id);
  }
}

