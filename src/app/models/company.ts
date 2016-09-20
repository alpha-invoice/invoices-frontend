/**
 * Represents a Company model class.
 * @class
 */
export class Company {
  constructor(public id: number,
              public name: string,
              public mol: string,
              public address: string,
              public eik: string,
              public isVatRegistered: boolean,
              public vatNumber: string) {
  }

  /**
   * Parses an anonymous object to an instance of a Company class.
   * Called when a Company class instance is needed before sending
   * the object to the service for storage.
   * @param obj the anonymous object
   * @returns {Company} the parsed object
   */
  public static parseOutputObjectToCompany(obj): Company {
    return new Company(null, obj.name, obj.mol, obj.address, obj.eik, obj.isVatRegistered, obj.vatNumber);
  }

  /**
   * Parses an object that comes from a parsed JSON string.
   * Usually called after a service maps the JSON string to a JS object.
   * @param obj
   */
  public static parseCompanyFromObj(obj): Company {
    return new Company(obj.id, obj.name, obj.mol, obj.address,
                        obj.eik, obj.vatregistered, obj.vatnumber);
  }
  public toString() {
    return `${this.name}, ${this.mol}, ${this.address}, ${this.eik}, ${this.vatNumber}, ${this.isVatRegistered}`
  }
  static createEmptyCompany():Company {
    return new Company(null, null, null, null, null, null, null);
  }
}
