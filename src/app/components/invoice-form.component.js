"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var invoice_1 = require("../models/invoice");
var company_1 = require("../models/company");
var item_1 = require("../models/item");
var invoice_service_1 = require("../services/invoice.service");
/**
 * Represents a form which submits new invoices
 * to the service. Uses dependency injection to load
 * our service.
 * @class
 */
var InvoiceFormComponent = (function () {
    function InvoiceFormComponent(_invoiceService) {
        this._invoiceService = _invoiceService;
    }
    /**
     * Implemented method from {@link OnInit} interface which
     * is called after the constructor of the class. We instantiate
     * our invoiceToBeStored by an empty Invoice object which we
     * fill from the form.
     */
    InvoiceFormComponent.prototype.ngOnInit = function () {
        this.invoiceToBeStored = invoice_1.Invoice.createEmptyInvoice();
    };
    /**
     * EventHandler method which is called when the form Add button
     * is clicked. It stores the updated invoiceToBeStored object by
     * passing it to the invoice service.
     * @param invoiceNumber string passed from the form input.
     * @param sender anonymous object passed from the form input.
     * @param recipient anonymous object passed from the form input.
     * @param item anonymous object passed from the form input.
     */
    InvoiceFormComponent.prototype.addNewInvoice = function (invoiceNumber, sender, recipient, item) {
        this.updateInvoiceFromForm(invoiceNumber, sender, recipient, item);
        this._invoiceService.addInvoice(this.invoiceToBeStored);
    };
    /**
     * Updates the invoiceToBeStored object by storing the parsed form values
     * to the appropriate fields of the Invoice object.
     * @param invoiceNumber string
     * @param sender anonymous object which needs to be mapped to a Company instance
     * @param recipient anonymous object which needs to be mapped to a Company instance
     * @param item anonymous object which needs to be mapped to an Item instance
     */
    InvoiceFormComponent.prototype.updateInvoiceFromForm = function (invoiceNumber, sender, recipient, item) {
        this.invoiceToBeStored.invoiceNumber = invoiceNumber;
        this.invoiceToBeStored.sender = company_1.Company.parseOutputObjectToCompany(sender);
        this.invoiceToBeStored.recipient = company_1.Company.parseOutputObjectToCompany(recipient);
        this.invoiceToBeStored.items.push(item_1.Item.parseOutputObjectToItem(item));
    };
    InvoiceFormComponent = __decorate([
        core_1.Component({
            selector: 'invoice-form',
            templateUrl: 'templates/invoice-form.component.html',
            providers: [invoice_service_1.InvoiceService]
        })
    ], InvoiceFormComponent);
    return InvoiceFormComponent;
}());
exports.InvoiceFormComponent = InvoiceFormComponent;
//# sourceMappingURL=invoice-form.component.js.map