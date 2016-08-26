import {Component, OnInit} from "@angular/core";
import {Invoice} from "../models/invoice";
import {Company} from "../models/company";
import {Item} from "../models/item";
import {InvoiceService} from "../services/invoice.service";

/**
 * Represents a form which submits new invoices
 * to the service. Uses dependency injection to load
 * our service.
 * @class
 */
@Component({
  selector: 'invoice-form',
  templateUrl: 'templates/invoice-form.component.html',
  providers:[InvoiceService]
})
export class InvoiceFormComponent implements OnInit{
  invoiceToBeStored:Invoice;

  constructor(private _invoiceService: InvoiceService) {
  }

  /**
   * Implemented method from {@link OnInit} interface which
   * is called after the constructor of the class. We instantiate
   * our invoiceToBeStored by an empty Invoice object which we
   * fill from the form.
   */
  ngOnInit() {
    this.invoiceToBeStored = Invoice.createEmptyInvoice();
  }

  /**
   * EventHandler method which is called when the form Add button
   * is clicked. It stores the updated invoiceToBeStored object by
   * passing it to the invoice service.
   * @param invoiceNumber string passed from the form input.
   * @param sender anonymous object passed from the form input.
   * @param recipient anonymous object passed from the form input.
   * @param item anonymous object passed from the form input.
   */
  addNewInvoice(invoiceNumber, sender, recipient, item) {
    this.updateInvoiceFromForm(invoiceNumber, sender, recipient, item);
    this._invoiceService.addInvoice(this.invoiceToBeStored);
  }

  /**
   * Updates the invoiceToBeStored object by storing the parsed form values
   * to the appropriate fields of the Invoice object.
   * @param invoiceNumber string
   * @param sender anonymous object which needs to be mapped to a Company instance
   * @param recipient anonymous object which needs to be mapped to a Company instance
   * @param item anonymous object which needs to be mapped to an Item instance
   */
  private updateInvoiceFromForm(invoiceNumber, sender, recipient, item) {
    this.invoiceToBeStored.invoiceNumber = invoiceNumber;
    this.invoiceToBeStored.sender = Company.parseOutputObjectToCompany(sender);
    this.invoiceToBeStored.recipient = Company.parseOutputObjectToCompany(recipient);
    this.invoiceToBeStored.items.push(Item.parseOutputObjectToItem(item));
  }
}
