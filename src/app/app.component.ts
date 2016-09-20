import { Component, DoCheck } from '@angular/core';
import {ROUTER_DIRECTIVES } from "@angular/router";
import {AuthService} from "./auth/auth.service";
import {UserService} from "./services/user.service";
/**
 * Represents the main class from where the Angular App starts.
 * @class
 */
@Component({
  selector: 'app-root',
  templateUrl: 'templates/app.component.html',
  styleUrls: ['templates/styles/css/bootstrap.css'],
  providers: [UserService],
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent implements DoCheck {
  userEmail: string = '';

  constructor(private authService: AuthService, private userService: UserService) {

  }

  ngDoCheck() {
    if(this.authService.isLoggedIn) {
      this.getUserEmail();
    }
  }

  isLoggedIn: boolean = this.authService.isLoggedIn;

  getUserEmail() {
    if(this.userEmail == '') {
      this.userService.getUserEmail().then((res) => { 
        this.userEmail = res.json().email;
      });
    }
      return this.userEmail;
  }


}