import {Component, OnInit } from "@angular/core";
import {Invoice} from "../models/invoice";
import {Item} from "../models/item";
import {Company} from "../models/company";
import {InvoiceService} from "../services/invoice.service";
import {InvoiceComponent} from "./invoice.component";
import {CompanyComponent} from "./company.component";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {InvoicesCaptionComponent} from "./invoices-caption.component";

const invoicesPerPage: number = 6;
/** 
 * Represents a list of all invoices provided
 * from a service. Uses dependency injection to load
 * our service.
 * @class
 */

@Component({
  selector: 'invoice-list',
  templateUrl: 'templates/invoice-list.component.html',
  styleUrls: ['templates/styles/css/invoice-list.component.css'],
  providers: [InvoiceService],
  directives: [ROUTER_DIRECTIVES, InvoiceComponent, CompanyComponent, InvoicesCaptionComponent]

})
export class InvoiceListComponent implements OnInit {
  //array of all users invoices
  invoices: Invoice[] = [];
  //array of the invoices that are shown on the current page.We should set value to this array whenever we want to show only some of the invoices.
  //usage: invoicesOnPage = {ourFilteredInvoices}.slice(currentPagingStartIndex,currentPagingEndIndex)
  invoicesOnPage: Invoice[] = [];
  //array of invoices filtered by any filter.we should set value to this array everytime when we filter the user invoices in any way
  //usage: currentInvoicesLoaded = {ourFilteredInvoices}
  currentInvoicesLoaded: Invoice[] = [];
  //array of userr companies and recipients
  allUserCompanies: Company[] = [];
  allUserRecipients: Company[] = [];
  //Variables for the custom paging
  currentPagingStartIndex: number = -2;
  currentPagingEndIndex: number = 0;
  //if the user has clicked on any of invoicesOnPage invoice we set this 
  //invoice for the data binding in the invoice template
  invoiceToBePreviewed: Invoice;
  //if the user has clicked on an invoice we set this variable to be true
  invoiceClicked: boolean;
  constructor(private _invoiceService: InvoiceService) { }

  /**
   * Implemented method from {@link OnInit} interface which
   * is called after the constructor of the class. We use the
   * provided service to load all invoices.
   */
  ngOnInit() {
    this._invoiceService.getInvoice()
      .then(response => {
        response.forEach(arrayOfInvoices => arrayOfInvoices.map(invoice => this.currentInvoicesLoaded.push(invoice)))
        this.invoices = this.currentInvoicesLoaded;
        this.showNextInvoices();
        this.setAllUserCompanies();
        this.setAllUserRecipients();
      })
      .catch(error => console.error(error));

  }
  /**
   * We use this
   * function to set the invoice that should be shown on the screen after
   * the user clicks it.
   */
  setInvoice(id) {
    this.invoiceToBePreviewed = this.getInvoiceById(id)
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
   * Here we return the invoice that was clicked in order to show it on the screen by 
   * using data binding.
   */
  getClickedInvoice() {
    return this.invoiceToBePreviewed;
  }
  /**
   * Here we change the invoicesOnPage array (the array with the current showed invoices)
   * with the new invoices that should be showed
   * 
   */
  showNextInvoices() {
    if (this.currentPagingEndIndex < this.currentInvoicesLoaded.length) {
      this.currentPagingStartIndex = this.currentPagingEndIndex;
      this.currentPagingEndIndex += invoicesPerPage;
      this.invoicesOnPage = this.currentInvoicesLoaded.slice(this.currentPagingStartIndex, this.currentPagingEndIndex);
    }
  }
  /**
   * Here we do exactly the opposite of our getNextInvoices function
   */
  showPreviousInvoices() {
    if (this.currentPagingStartIndex != 0) {
      this.currentPagingEndIndex = this.currentPagingStartIndex;
      this.currentPagingStartIndex -= invoicesPerPage;
      this.invoicesOnPage = this.currentInvoicesLoaded.slice(this.currentPagingStartIndex, this.currentPagingEndIndex);
    }
  }
  /**
   * Here we itterate all user invoices and add each of his companies names to our allUserCompanies set.
   * We do this to populate the filter by sender options.
   */
  setAllUserCompanies() {
    this.invoices.forEach(invoice => {
      if (!this.contains(invoice.sender, this.allUserCompanies)) {
        this.allUserCompanies.push(invoice.sender);
      }
    });
  }
  /**
   * This function traverses the invoices array and adds all unique 
   * recipient companies to an array.
   */
  setAllUserRecipients() {
    this.invoices.forEach(invoice => {
      if (!this.contains(invoice.recipient, this.allUserRecipients)) {
        this.allUserRecipients.push(invoice.recipient);
      }
    });
  }
  /**
   * Here we search for matching strings or numbers in the users invoices.We show the results
   * real time ,word by word.
   */
  searchInvoices(search) {
    search = search.toLowerCase();
    var invoicesFilteredBySearch: Invoice[] = [];
    for (var index in this.invoices) {
      var currentInvoice: Invoice = this.invoices[index];
      if (currentInvoice.invoiceNumber.toLowerCase().indexOf(search) !== -1) {
        invoicesFilteredBySearch.push(currentInvoice);
      } else if (currentInvoice.sender.toString().toLowerCase().indexOf(search) !== -1) {
        invoicesFilteredBySearch.push(currentInvoice);
      } else if (currentInvoice.recipient.toString().toLowerCase().indexOf(search) !== -1) {
        invoicesFilteredBySearch.push(currentInvoice);
      } else if (currentInvoice.items.toString().toLowerCase().indexOf(search) !== -1) {
        invoicesFilteredBySearch.push(currentInvoice);
      }
      this.currentInvoicesLoaded = invoicesFilteredBySearch;
      this.invoicesOnPage = this.currentInvoicesLoaded.slice(this.currentPagingStartIndex, this.currentPagingEndIndex);
    }
  }

  /**
   * Here we filter our array of invoices ,leaving the ones that have theirs senders matching the option that was selected.
   */
  filterBySender(option) {
    if (option == "all") {
      this.invoicesOnPage = this.invoices.slice(this.currentPagingStartIndex, this.currentPagingEndIndex);
      this.currentInvoicesLoaded = this.invoices;
    } else {
      this.invoicesOnPage = this.filterInvoicesBySenderName(option).slice(this.currentPagingStartIndex, this.currentPagingEndIndex);
      while (this.invoicesOnPage.length == 0) {
        this.showPreviousInvoices();
      }
    }
  }
  /**
   * Here traverse all of the user's invoices and filter the onces who have the same sender name as the one given as a parameter.
   */
  filterInvoicesBySenderName(name) {
    var filteredInvoices = [];
    this.invoices.forEach(invoice => {
      if (invoice.sender.name == name) {
        filteredInvoices.push(invoice);
      }
    });
    this.currentInvoicesLoaded = filteredInvoices;
    return filteredInvoices;
  }
  /**
   * Here we filter our array of invoices ,leaving the ones that have theirs recipients matching the option that was selected.
   */
  filterByRecipient(option) {
    if (option == "all") {
      this.invoicesOnPage = this.invoices.slice(this.currentPagingStartIndex, this.currentPagingEndIndex);
      this.currentInvoicesLoaded = this.invoices;
    } else {
      this.invoicesOnPage = this.filterInvoicesByRecipientName(option).slice(this.currentPagingStartIndex, this.currentPagingEndIndex);
      while (this.invoicesOnPage.length == 0) {
        this.showPreviousInvoices();
      }
    }
  }
  /**
   * Here traverse all of the user's invoices and filter the onces who have the same recipient name as the one given as a parameter.
   */
  filterInvoicesByRecipientName(name) {
    var filteredInvoices = [];
    this.invoices.forEach(invoice => {
      if (invoice.recipient.name == name) {
        filteredInvoices.push(invoice);
      }
    });
    this.currentInvoicesLoaded = filteredInvoices;
    return filteredInvoices;
  }
  /**
   * Helper function to find the current page of invoices that the user is currently on.
   */
  getCurrentPage() {
    var page = Math.ceil(this.currentPagingEndIndex / invoicesPerPage);
    if (page == 0) {
      return 1;
    } else {
      return page
    }
  }

  /**
   * Helper function.We use this function to guarantee
   * that our arrays will be unique.
   */
  contains(obj, array) {
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
  getAllUserCompaniesNames() {
    var allUserCompaniesNames: string[] = [];
    this.allUserCompanies.forEach(company => {
      if (!this.contains(company.name, allUserCompaniesNames)) {
        allUserCompaniesNames.push(company.name);
      }
    })
    return allUserCompaniesNames;
  }

  /**
   * Traverses the array with user recipients and extracts their names
   * in allUserRecipientNames array , which we use to fill the select options
   */
  getAllUserRecipientsNames() {
    var allUserRecipientsNames: string[] = [];
    this.allUserRecipients.forEach(company => {
      if (!this.contains(company.name, allUserRecipientsNames)) {
        allUserRecipientsNames.push(company.name);
      }
    })
    return allUserRecipientsNames;
  }
}