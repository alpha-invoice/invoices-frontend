import {Http} from "@angular/http";
import {Invoice} from "../models/invoice";
import {Company} from "../models/company";


export class AutocompleteService{

  private serviceUrl = '/api/companies/brra';

  constructor(private http: Http) { }

  getCompany(eik: string): Promise<Company> {

    return this.http.get(this.serviceUrl)
      .map((res) => res.json())
      .map(company => company.map(eik => {
        debugger;
        var company = Company.parseInputObjectToCompany()
      }))
      .toPromise();
  }
}

//
// return this.http.get(this.serviceUrl)
//   .map((res) => res.json())
//   .map(invoice => invoice.map(i => {
//     debugger;
//     var senderCompany = Company.parseInputObjectToCompany(i.sender);
//     var recipientCompany = Company.parseInputObjectToCompany(i.recipient);
//     i.items.map(i=> Item.parseInputObjectToItem(i));
//     return new Invoice(i.id, i.invoiceNumber, senderCompany, recipientCompany, i.items);
//   }))
//   .toPromise();
