import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

/**
 *
 */
@Component({
  selector: 'main-page',
  templateUrl: 'templates/main-page.component.html',
  styleUrls: ['templates/styles/css/main-page.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class MainPageComponent implements OnInit {

  ngOnInit() {
    
  }
}

