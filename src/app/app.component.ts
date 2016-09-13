import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
/**
 * Represents the main class from where the Angular App starts.
 * @class
 */
@Component({
  selector: 'app-root',
  templateUrl: 'templates/app.component.html',
  styleUrls: ['templates/styles/css/bootstrap.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
  homeTab = "home";
  homeTabCaption = "e-fakturi"
  secondTab = "login";
  secondTabCaption = "Влез";
  thirdTab = "contacts";
 	thirdTabCaption = "Контакти";
  dropdownCaption = "";
}
