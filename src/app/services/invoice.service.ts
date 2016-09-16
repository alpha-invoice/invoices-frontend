import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Invoice} from "../models/invoice";
import "rxjs/add/operator/toPromise";
import "app/rxjs-extensions";
import {Company} from "../models/company";
import {Item} from "../models/item";
import {AuthService} from "../auth/auth.service";

/**
 * Represents an Invoice service class.
 * It handles all HTTP requests to the business layer
 * in order to store/retrieve Invoice objects.
 * @class
 */
@Injectable()
export class InvoiceService {
    private baseUrl = 'http://localhost:8080/';
    private serviceUrl = this.baseUrl + '/api/invoices';

    constructor(private http: Http, private authService: AuthService) { }

    createAuthorizationHeader(headers?: Headers): Headers {
      let authHeaders = headers || new Headers();
      authHeaders.append('Authorization', 'Bearer ' + this.authService.getAccessToken());
      return authHeaders;
    }

    /**
     * Stores a new Invoice to the database.
     * @return a Promise of the request
     */
    addInvoice(newInvoice: Invoice): Promise<Response> {
        let body = JSON.stringify(newInvoice);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http
            .patch(this.serviceUrl, body, {
              headers: this.createAuthorizationHeader(headers)
            })
            .toPromise();
    }

  /**
   * Retrieves all invoices stored in the database by
   * mapping the resulting string to a js object and
   * returning TypeScript instantiated classes.
   * @returns a Promise which holds all the invoices
   */
  //TODO: should retrieve user specific invoices
  getInvoices(): Promise<Invoice[]> {
        return this.http.get(this.serviceUrl, {
          headers: this.createAuthorizationHeader()
        })
          .map((res) => res.json())
          .map(invoice => invoice.map(i => {
            debugger;
            var senderCompany = Company.parseInputObjectToCompany(i.sender);
            var recipientCompany = Company.parseInputObjectToCompany(i.recipient);
            i.items.map(i=> Item.parseInputObjectToItem(i));
            return new Invoice(i.id, i.invoiceNumber, senderCompany, recipientCompany, i.items);
          }))
          .toPromise();
    }

}
