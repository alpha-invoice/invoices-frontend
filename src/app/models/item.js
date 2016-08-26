"use strict";
/**
 * Represents an Item model class.
 * @class
 */
var Item = (function () {
    function Item(id, description, quantity, priceWithoutVAT) {
        this.id = id;
        this.description = description;
        this.quantity = quantity;
        this.priceWithoutVAT = priceWithoutVAT;
    }
    /**
     * Parses an anonymous object to an instance of an Item class.
     * Called when am Item class instance is needed before sending
     * the object to the service for storage.
     * @param obj the anonymous object
     * @returns {Item} the parsed object
     */
    Item.parseOutputObjectToItem = function (obj) {
        return new Item(null, obj.description, obj.quantity, obj.priceWithoutVAT);
    };
    /**
     * Parses an object that comes from a parsed JSON string.
     * Usually called after a service maps the JSON string to a JS object.
     * @param obj
     */
    Item.parseInputObjectToItem = function (obj) {
        return new Item(obj.id, obj.description, obj.quantity, obj.priceWithoutVAT);
    };
    return Item;
}());
exports.Item = Item;
//# sourceMappingURL=item.js.map