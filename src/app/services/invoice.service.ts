import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Invoice} from "../models/invoice";
import "rxjs/add/operator/toPromise";
import "app/rxjs-extensions";
import {Company} from "../models/company";
import {Item} from "../models/item";
import {AuthService} from "../auth/auth.service";
import {BrowserXhr} from '@angular/http';

declare var saveAs;

/**
 * Represents an Invoice service class.
 * It handles all HTTP requests to the business layer
 * in order to store/retrieve Invoice objects.
 * @class
 */
@Injectable()
export class InvoiceService {
    private baseUrl = 'http://localhost:8080/';
    private serviceUrl = this.baseUrl + 'api/invoices';
    private createInvoiceUrl = this.baseUrl + 'api/invoices';

    public pending:boolean = false;

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
  addInvoice(newInvoice: Invoice): Promise<Response> 
  {
    let body = JSON.stringify(newInvoice);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http
      .post(this.serviceUrl, body, {
        headers: this.createAuthorizationHeader(headers)
      })
      .toPromise();
  }

    exportInvoice(newInvoice: Invoice) {
        let body = JSON.stringify(newInvoice);
        
        // Xhr creates new context so we need to create reference to this
        let self = this;

        // Status flag used in the template.
        this.pending = true;

        // Create the Xhr request object
        let xhr = new XMLHttpRequest();
        let url = this.createInvoiceUrl;
        xhr.open('PATCH', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.authService.getAccessToken());
        xhr.responseType = 'blob';

        // Xhr callback when we get a result back
        // We are not using arrow function because we need the 'this' context
        xhr.onreadystatechange = function() {

            // We use setTimeout to trigger change detection in Zones
            setTimeout( () => { self.pending = false; }, 0);

            // If we get an HTTP status OK (200), save the file using fileSaver
            if(xhr.readyState === 4 && xhr.status === 200) {
                var blob = new Blob([this.response], {type: 'application/pdf'});
                saveAs(blob);
            }
        };

        xhr.send(body);
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
        i.items.map(i => Item.parseInputObjectToItem(i));
        return new Invoice(i.id, i.invoiceNumber, senderCompany, recipientCompany, i.items);
      }))
      .toPromise();
  }
}