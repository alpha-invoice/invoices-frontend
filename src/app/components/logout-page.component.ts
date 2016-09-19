import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'logout-page',
  template: 'templates/logout-page.component.html',
  directives: [ROUTER_DIRECTIVES]
})
export class LogoutComponent {
  
  constructor(private authService: AuthService,
  private _router: Router) {

  }

  ngOnInit() {
    this.authService.logout();
  }
}