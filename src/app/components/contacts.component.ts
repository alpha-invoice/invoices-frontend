import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {HomePageComponent} from './home-page.component';
/**
 * This is the contacts page.
 */
@Component({
  selector: 'contacts',
  templateUrl: 'templates/contacts.component.html',
  styleUrls: ['templates/styles/css/bootstrap.css'],
  directives: [ROUTER_DIRECTIVES,HomePageComponent]
})
export class ContactsPageComponent {
  email = "pesho@fake.com";
  github = "link";
}
