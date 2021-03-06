import {Component, Input} from "@angular/core";
import {Invoice} from "../models/invoice";
import {CompanyComponent} from "../components/company.component";
import {ItemsComponent} from "../components/items.component";

/**
 * Represents a single Invoice component.
 * It gets the invoiceToBeStored to be rendered by an Input variable
 * passed from the {@link InvoiceListComponent} component.
 * @class
 */
@Component({
  selector: 'invoice',
  templateUrl: 'templates/invoice.component.html',
  directives: [CompanyComponent, ItemsComponent]
})
export class InvoiceComponent {
  @Input() invoice: Invoice;
  type: string;
  getSender() {
    this.type = "Доставчик"
    return this.invoice.sender;
  }
  getRecipient() {
    this.type = "Получател"
    return this.invoice.recipient;
  }
  getItems() {
    return this.invoice.items;
  }
  getDate() {
    return this.invoice.date;
  }
  getCurrency() {
    return this.invoice.currency;
  }
  getType() {
    return this.type;
  }
}
