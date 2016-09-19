import {Component, Output, EventEmitter} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

/**
 * This is the Login Page Component which handles
 * all the logic behind loging in and saving the open id from google
 */
@Component({
  selector: 'login-page',
  templateUrl: 'templates/login-page.component.html',
  styleUrls: ['templates/styles/css/login-page.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class LoginPageComponent {
  constructor(private authService: AuthService) {

  }

  login() {
    this.authService.login();
  }
}