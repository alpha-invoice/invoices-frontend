import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
/**
 * This is the contacts page.
 */
@Component({
  selector: 'contacts',
  templateUrl: 'templates/contacts.component.html',
  styleUrls: ['templates/styles/css/bootstrap.css', 'templates/styles/css/contacts.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class ContactsPageComponent {
  email = "testInvoices95@gmail.com";
  github = "https://github.com/alpha-invoice";
}
