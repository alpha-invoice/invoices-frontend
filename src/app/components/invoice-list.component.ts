import {Component, OnInit } from "@angular/core";
import {Invoice} from "../models/invoice";
import {Item} from "../models/item";
import {Company} from "../models/company";
import {InvoiceService} from "../services/invoice.service";
import {InvoiceComponent} from "./invoice.component";
import {CompanyComponent} from "./company.component";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {InvoicesCaptionComponent} from "./invoices-caption.component";

const invoicesPerPage: number = 3;
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
  currentInvoicesLoaded: Invoice[] = [];
  allUserCompanies: Company[] = [];
  allUserRecipients: Company[] = [];
  //Variables for the custom paging
  startIndex: number = -2;
  endIndex: number = 0;
  previewInvoice: Invoice;
  //if the user has clicked on an invoice we set this variable to be true
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

    //start of seed
    var inv1 = new Invoice(9607122351, "9607122351",
      new Company(123, "GoshoAD", "123123", "yl.Sofiq", "12312312", true, "12312312"),
      new Company(123, "CoopAd", "123123", "yl.Sofiq", "12312312", true, "12312312"),
      [new Item(2, "Domati", 23, 10)]);
    this.invoices.push(inv1);
    var inv2 = new Invoice(7423885552, "7423885552",
      new Company(123, "IvanAD", "123123", "yl.Sofiq", "12312312", true, "12312312"),
      new Company(123, "CoopAd", "123123", "yl.Sofiq", "12312312", true, "12312312"),
      [new Item(2, "Krastavici za prodan,iznos,vnos,agrarni uslugi,durven material", 23, 10),
        new Item(2, "Patladjani", 23, 10)]);
    this.invoices.push(inv2);
    var inv3 = new Invoice(3315632063, "3315632063",
      new Company(123, "PeturAD", "123123", "yl.Sofiq", "12312312", true, "12312312"),
      new Company(123, "MitakAD", "123123", "yl.Sofiq", "12312312", true, "12312312"),
      [new Item(2, "Domati", 23, 10)]);
    this.invoices.push(inv3);
    var inv4 = new Invoice(7316629634, "7316629634",
      new Company(123, "OgnqnAD", "123123", "yl.Sofiq", "12312312", true, "12312312"),
      new Company(123, "CoopAd", "123123", "yl.Sofiq", "12312312", true, "12312312"),
      [new Item(5599503165, "Domati", 23, 10)]);
    this.invoices.push(inv4);
    //end of seed
    this.currentInvoicesLoaded = this.invoices;
    this.showNextInvoices();
    this.setAllUserCompanies();
    this.setAllUserRecipients();
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
  showNextInvoices() {
    if (this.endIndex < this.currentInvoicesLoaded.length) {
      this.startIndex = this.endIndex;
      this.endIndex += invoicesPerPage;
      this.invoicesOnPage = this.currentInvoicesLoaded.slice(this.startIndex, this.endIndex);
    }
  }
  /**
   * Here we do exactly the opposite of our getNextInvoices function
   */
  showPreviousInvoices() {
    if (this.startIndex != 0) {
      this.endIndex = this.startIndex;
      this.startIndex -= invoicesPerPage;
      this.invoicesOnPage = this.currentInvoicesLoaded.slice(this.startIndex, this.endIndex);
    }
  }
  /**
   * Here we itterate all user invoices and add each of his companies names to our allUserCompanies set.
   * We do this to populate the filter by sender options.
   */
  setAllUserCompanies(){
    this.invoices.forEach(invoice => {
      if(!this.contains(invoice.sender,this.allUserCompanies)){
        this.allUserCompanies.push(invoice.sender);
      }
    });
  }
  /**
   * This function traverses the invoices array and adds all unique 
   * recipient companies to an array.
   */
  setAllUserRecipients(){
    this.invoices.forEach(invoice => {
      if(!this.contains(invoice.recipient,this.allUserRecipients)){
        this.allUserRecipients.push(invoice.recipient);
      }
    });
  }
  filterBySender(option) {
    if(option == "all"){
      this.invoicesOnPage = this.invoices.slice(this.startIndex, this.endIndex);
      this.currentInvoicesLoaded = this.invoices;
    }else {
      this.invoicesOnPage = this.filterInvoicesBySenderName(option).slice(this.startIndex, this.endIndex);
    }
  }

  searchInvoices(search) {
    search = search.toLowerCase();
    var invoicesFilteredBySearch: Invoice[] = [];

      for (var index in this.invoices) {
        var currentInvoice : Invoice = this.invoices[index];
        
        if(currentInvoice.invoiceNumber.toLowerCase().indexOf(search) !== -1) {
          invoicesFilteredBySearch.push(currentInvoice);
        } else if(currentInvoice.sender.toString().toLowerCase().indexOf(search) !== -1) {
          invoicesFilteredBySearch.push(currentInvoice);
        } else if(currentInvoice.recipient.toString().toLowerCase().indexOf(search) !== -1) {
          invoicesFilteredBySearch.push(currentInvoice);
        } else if(currentInvoice.items.toString().toLowerCase().indexOf(search) !== -1) {
          invoicesFilteredBySearch.push(currentInvoice);
        }

        this.currentInvoicesLoaded = invoicesFilteredBySearch;
        this.invoicesOnPage =this.currentInvoicesLoaded.slice(this.startIndex, this.endIndex);
    }

    console.log(invoicesFilteredBySearch);
  }

  filterInvoicesBySenderName(name){
    var filteredInvoices = [];
    this.invoices.forEach(invoice => {
      if(invoice.sender.name == name){
        filteredInvoices.push(invoice);
      }
    });
    this.currentInvoicesLoaded = filteredInvoices;
    return filteredInvoices;
  }
  filterByRecipient(option) {
    if(option == "all"){
      this.invoicesOnPage = this.invoices.slice(this.startIndex, this.endIndex);
      this.currentInvoicesLoaded = this.invoices;
    }else {
      this.invoicesOnPage = this.filterInvoicesByRecipientName(option).slice(this.startIndex, this.endIndex);
    }
  }
  filterInvoicesByRecipientName(name){
    var filteredInvoices = [];
    this.invoices.forEach(invoice => {
      if(invoice.recipient.name == name){
        filteredInvoices.push(invoice);
      }
    });
    this.currentInvoicesLoaded = filteredInvoices;
    return filteredInvoices;
  }
  getCurrentPage(){
    return Math.ceil(this.endIndex/invoicesPerPage);
  }

  /**
   * Helper function.We use this function to guarantee
   * that our arrays will be unique.
   */
  contains(obj,array) {
    for (var element of array) {
        if (element === obj) {
            return true;
        }
    }
    return false;
}
/**
 * Traverses the array with user companies and extracts their names
 * in allUserCompaniesNames array , which we use to fill the select options
 */
getAllUserCompaniesNames(){
  var allUserCompaniesNames: string[] = [];
  this.allUserCompanies.forEach(company => {
    if(!this.contains(company.name,allUserCompaniesNames)){
      allUserCompaniesNames.push(company.name);
    }
  })
  return allUserCompaniesNames;
}

/**
 * Traverses the array with user recipients and extracts their names
 * in allUserRecipientNames array , which we use to fill the select options
 */
getAllUserRecipientsNames(){
  var allUserRecipientsNames: string[] = [];
  this.allUserRecipients.forEach(company => {
    if(!this.contains(company.name,allUserRecipientsNames)){
      allUserRecipientsNames.push(company.name);
    }
  })
  return allUserRecipientsNames;
}
}