import {Company} from "./company";
import {Item} from "./item";

/**
 * Represents an Invoice model class.
 * @class
 */
export class Invoice {
  constructor(public id: number,
              public invoiceNumber: string,
              public sender: Company,
              public recipient: Company,
              public items: Item[]) {
  }

  /**
   * Used for filling the properties from a form
   * @returns {Invoice}
   */
  public static createEmptyInvoice():Invoice {
    return new Invoice(null, null, null, null, []);
  }
}
