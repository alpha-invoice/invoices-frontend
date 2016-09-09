import { Component } from '@angular/core';
import {InvoiceListComponent} from "./components/invoice-list.component";
import {InvoiceFormComponent} from "./components/invoice-form.component";
import {HomePageComponent} from "./components/home-page.component";
import {ROUTER_DIRECTIVES} from "@angular/router";

/**
 * Represents the main class from where the Angular App starts.
 * @class
 */
@Component({
  selector: 'app-root',
  templateUrl: 'templates/app.component.html',
  //template: "<h1>HOP</h1>",
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
}
