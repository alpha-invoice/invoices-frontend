import {Component, OnInit} from "@angular/core";
import {Invoice} from "../models/invoice";
import {InvoiceService} from "../services/invoice.service";
import {InvoiceComponent} from "./invoice.component";
import {ROUTER_DIRECTIVES} from "@angular/router";

/**
 * Represents a list of all invoices provided
 * from a service. Uses dependency injection to load
 * our service.
 * @class
 */
@Component({
  selector: 'invoice-list',
  templateUrl: 'templates/invoice-list.component.html',
  providers: [InvoiceService],
  directives: [ROUTER_DIRECTIVES, InvoiceComponent]
})
export class InvoiceListComponent implements OnInit{
  invoices: Invoice[];

  constructor(private _invoiceService:InvoiceService) {
  }

  /**
   * Implemented method from {@link OnInit} interface which
   * is called after the constructor of the class. We use the
   * provided service to load all invoices.
   */
  ngOnInit() {
    this._invoiceService.getInvoices()
                        .then(response=>this.invoices=response)
                        .catch(error=>console.error(error));
  }
}
