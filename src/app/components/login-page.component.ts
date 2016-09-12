
import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

/**
 * This is the Login Page Component which handles
 * all the logic behind loging in and saving the open id
 */
@Component({
  selector: 'home-page',
  templateUrl: 'templates/login-page.component.html',
  styleUrls: ['templates/styles/css/bootstrap.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class LoginPageComponent {
}

