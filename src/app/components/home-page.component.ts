import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

/**
 * This is the home page component which loads
 * when you load the invoices site.
 */
@Component({
  selector: 'home-page',
  templateUrl: 'templates/home-page.component.html',
  styleUrls: ['templates/styles/css/bootstrap.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class HomePageComponent {
}
