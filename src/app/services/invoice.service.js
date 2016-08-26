"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var invoice_1 = require('../models/invoice');
require('rxjs/add/operator/toPromise');
require('app/rxjs-extensions');
var company_1 = require("../models/company");
var item_1 = require("../models/item");
/**
 * Represents an Invoice service class.
 * It handles all HTTP requests to the business layer
 * in order to store/retrieve Invoice objects.
 * @class
 */
var InvoiceService = (function () {
    function InvoiceService(http) {
        this.http = http;
        this.serviceUrl = '/invoices';
    }
    /**
     * Stores a new Invoice to the database.
     * @return a Promise of the request
     */
    InvoiceService.prototype.addInvoice = function (newInvoice) {
        var body = JSON.stringify(newInvoice);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http
            .patch(this.serviceUrl, body, options)
            .toPromise();
    };
    /**
     * Retrieves all invoices stored in the database by
     * mapping the resulting string to a js object and
     * returning TypeScript instantiated classes.
     * @returns a Promise which holds all the invoices
     */
    //TODO: should retrieve user specific invoices
    InvoiceService.prototype.getInvoices = function () {
        return this.http.get(this.serviceUrl)
            .map(function (res) { return res.json(); })
            .map(function (invoice) { return invoice.map(function (i) {
            debugger;
            var senderCompany = company_1.Company.parseInputObjectToCompany(i.sender);
            var recipientCompany = company_1.Company.parseInputObjectToCompany(i.recipient);
            i.items.map(function (i) { return item_1.Item.parseInputObjectToItem(i); });
            return new invoice_1.Invoice(i.id, i.invoiceNumber, senderCompany, recipientCompany, i.items);
        }); })
            .toPromise();
    };
    InvoiceService = __decorate([
        core_1.Injectable()
    ], InvoiceService);
    return InvoiceService;
}());
exports.InvoiceService = InvoiceService;
//# sourceMappingURL=invoice.service.js.map