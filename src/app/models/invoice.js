"use strict";
/**
 * Represents an Invoice model class.
 * @class
 */
var Invoice = (function () {
    function Invoice(id, invoiceNumber, sender, recipient, items) {
        this.id = id;
        this.invoiceNumber = invoiceNumber;
        this.sender = sender;
        this.recipient = recipient;
        this.items = items;
    }
    /**
     * Used for filling the properties from a form
     * @returns {Invoice}
     */
    Invoice.createEmptyInvoice = function () {
        return new Invoice(null, null, null, null, []);
    };
    return Invoice;
}());
exports.Invoice = Invoice;
//# sourceMappingURL=invoice.js.map