import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";

/**
 * Represents the main class from where the Angular App starts.
 * @class
 */
@Component({
  selector: 'app-root',
  templateUrl: 'templates/app.component.html',
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
}
