import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES } from "@angular/router";
import {AuthService} from "./auth/auth.service";

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
  constructor(private authService: AuthService) {

  }
  isLoggedIn: boolean = this.authService.isLoggedIn;
}
