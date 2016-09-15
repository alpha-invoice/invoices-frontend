import {Component, OnInit } from "@angular/core";
import {Invoice} from "../models/invoice";
import {Item} from "../models/item";
import {Company} from "../models/company";
import {InvoiceService} from "../services/invoice.service";
import {InvoiceComponent} from "./invoice.component";
import {CompanyComponent} from "./company.component";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {InvoicesCaptionComponent} from "./invoices-caption.component";

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
  directives: [ROUTER_DIRECTIVES, InvoiceComponent, CompanyComponent, InvoicesCaptionComponent]

})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];
  invoicesOnPage: Invoice[] = [];
  startIndex: number = -2;
  endIndex: number = 0;
  invoicesPerPage: number = 3;
  previewInvoice: Invoice;
  invoiceClicked: boolean;
  constructor(private _invoiceService: InvoiceService) {
  }

  /**
   * Implemented method from {@link OnInit} interface which
   * is called after the constructor of the class. We use the
   * provided service to load all invoices.
   */
  ngOnInit() {
    // this._invoiceService.getInvoices()
    //                     .then(response=>this.invoices=response)
    //                     .catch(error=>console.error(error));
    //seed
    var inv1 = new Invoice(9607122351, "123123",
      new Company(123, "GoshoAD", "123123", "yl.Sofiq", "12312312", true, "12312312"),
      new Company(123, "CoopAd", "123123", "yl.Sofiq", "12312312", true, "12312312"),
      [new Item(2, "Domati", 23, 10)]);
    this.invoices.push(inv1);
    var inv2 = new Invoice(7423885552, "123123",
      new Company(123, "IvanAD", "123123", "yl.Sofiq", "12312312", true, "12312312"),
      new Company(123, "CoopAd", "123123", "yl.Sofiq", "12312312", true, "12312312"),
      [new Item(2, "Krastavici za prodan,iznos,vnos,agrarni uslugi,durven material", 23, 10),
        new Item(2, "Patladjani", 23, 10)]);
    this.invoices.push(inv2);
    var inv3 = new Invoice(3315632063, "123123",
      new Company(123, "PeturAD", "123123", "yl.Sofiq", "12312312", true, "12312312"),
      new Company(123, "CoopAd", "123123", "yl.Sofiq", "12312312", true, "12312312"),
      [new Item(2, "Domati", 23, 10)]);
    this.invoices.push(inv3);
    var inv4 = new Invoice(7316629634, "123123",
      new Company(123, "OgnqnAD", "123123", "yl.Sofiq", "12312312", true, "12312312"),
      new Company(123, "CoopAd", "123123", "yl.Sofiq", "12312312", true, "12312312"),
      [new Item(5599503165, "Domati", 23, 10)]);
    this.invoices.push(inv4);
    this.getNextInvoices()
  }
  /**
   * We use this
   * function to set the invoice that should be shown on the screen after
   * the user clicks it.
   */
  setInvoice(id) {
    this.previewInvoice = this.getInvoiceById(id)
    this.invoiceClicked = true;
  }
  /**
   * Here we traverse our array of user's invoices
   * and search if there is an invoice with the same
   * id as the one given as a parameter.If there is one we return
   * it ,otherwise we return null.
   */
  getInvoiceById(id) {
    for (var index in this.invoices) {
      if (this.invoices[index].id == id) {
        return this.invoices[index];
      }
    }
    return null;
  }
  /**
   * Here we return the invoice that was set in the function setInvoice.
   */
  getClickedInvoice() {
    return this.previewInvoice;
  }
  /**
   * Here we change the invoicesOnPage array (the array with the current showed invoices)
   * with the new invoices that should be showed
   * 
   */
  getNextInvoices() {
    if (this.endIndex < this.invoices.length) {
      this.startIndex = this.endIndex;
      this.endIndex += this.invoicesPerPage;
      this.invoicesOnPage = this.invoices.slice(this.startIndex, this.endIndex);
    }
  }
  /**
   * Here we do exactly the opposite of our getNextInvoices function
   */
  getPreviousInvoices() {
    if (this.startIndex != 0) {
      this.endIndex = this.startIndex;
      this.startIndex -= this.invoicesPerPage;
      this.invoicesOnPage = this.invoices.slice(this.startIndex, this.endIndex);
    }
  }

  searchInvoices(search) {
    var invoicesFilteredBySearch: Invoice[] = [];

      for (var index in this.invoices) {
        var currentInvoice : Invoice = this.invoices[index];
        
        if(currentInvoice.invoiceNumber.indexOf(search) !== -1) {
          invoicesFilteredBySearch.push(currentInvoice);
        } else if(currentInvoice.sender.toString().indexOf(search) !== -1) {
          invoicesFilteredBySearch.push(currentInvoice);
        } else if(currentInvoice.recipient.toString().indexOf(search) !== -1) {
          invoicesFilteredBySearch.push(currentInvoice);
        } else if(currentInvoice.items.toString().indexOf(search) !== -1) {
          invoicesFilteredBySearch.push(currentInvoice);
        }
    }

    console.log(invoicesFilteredBySearch);
  }
}