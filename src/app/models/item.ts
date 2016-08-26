/**
 * Represents an Item model class.
 * @class
 */
export class Item {
  constructor(public id: number,
              public description: string,
              public quantity: number,
              public priceWithoutVAT: number) {
  }

  /**
   * Parses an anonymous object to an instance of an Item class.
   * Called when am Item class instance is needed before sending
   * the object to the service for storage.
   * @param obj the anonymous object
   * @returns {Item} the parsed object
   */
  public static parseOutputObjectToItem(obj): Item {
    return new Item(null, obj.description, obj.quantity, obj.priceWithoutVAT);
  }

  /**
   * Parses an object that comes from a parsed JSON string.
   * Usually called after a service maps the JSON string to a JS object.
   * @param obj
   */
  public static parseInputObjectToItem(obj): Item {
    return new Item(obj.id, obj.description, obj.quantity, obj.priceWithoutVAT);
  }
}
