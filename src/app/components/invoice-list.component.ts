import {Component, OnInit} from "@angular/core";
import {Invoice} from "../models/invoice";
import {Item} from "../models/item";
import {Company} from "../models/company";
import {InvoiceService} from "../services/invoice.service";
import {InvoiceComponent} from "./invoice.component";
import {CompanyComponent} from "./company.component";
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
  directives: [ROUTER_DIRECTIVES, InvoiceComponent,CompanyComponent]
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];
  invoiceToBeShowed: Invoice;
  invoiceClicked:boolean;
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
    this.invoices.push(new Invoice(111111101, "123123",
      new Company(123, "GoshoAD", "123123", "yl.Sofiq", "12312312", true, "12312312"),
      new Company(123, "CoopAd", "123123", "yl.Sofiq", "12312312", true, "12312312"),
      [new Item(2, "Domati", 23, 10)]));
    this.invoices.push(new Invoice(100000000, "123123",
      new Company(123, "IvanOOd", "325674654", "yl.Plovdiv", "12312312", false, "12312312"),
      new Company(123, "CoopAd", "123123", "yl.Sofiq", "12312312", true, "12312312"),
      [new Item(13, "Краставици", 23, 10),
      new Item(40, "Патладжани", 100, 10)]));
  }
  getInvoice(id){
    this.invoiceToBeShowed = this.getInvoiceById(id)
    this.invoiceClicked = true;
    console.log(this.invoiceToBeShowed);
  }
  getInvoiceById(id){
    for (var index in this.invoices) {
    	if(this.invoices[index].id == id){
        return this.invoices[index];
      }
    }
    return null;
  }
  showInvoice(){
    return this.invoiceToBeShowed;
  }
}
