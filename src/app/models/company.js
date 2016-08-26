"use strict";
/**
 * Represents a Company model class.
 * @class
 */
var Company = (function () {
    function Company(id, name, mol, address, eik, isVatRegistered, vatNumber) {
        this.id = id;
        this.name = name;
        this.mol = mol;
        this.address = address;
        this.eik = eik;
        this.isVatRegistered = isVatRegistered;
        this.vatNumber = vatNumber;
    }
    /**
     * Parses an anonymous object to an instance of a Company class.
     * Called when a Company class instance is needed before sending
     * the object to the service for storage.
     * @param obj the anonymous object
     * @returns {Company} the parsed object
     */
    Company.parseOutputObjectToCompany = function (obj) {
        return new Company(null, obj.name, obj.mol, obj.address, obj.eik, obj.isVatRegistered, obj.vatNumber);
    };
    /**
     * Parses an object that comes from a parsed JSON string.
     * Usually called after a service maps the JSON string to a JS object.
     * @param obj
     */
    Company.parseInputObjectToCompany = function (obj) {
        return new Company(obj.id, obj.name, obj.mol, obj.address, obj.eik, obj.vatregistered, obj.vatnumber);
    };
    Company.prototype.toString = function () {
        return "Name: " + this.name + ", mol: " + this.mol + ", address: " + this.address + ", eik: " + this.eik + ", VAT number: " + this.vatNumber + ", Is VAT registered: " + this.isVatRegistered;
    };
    return Company;
}());
exports.Company = Company;
//# sourceMappingURL=company.js.map