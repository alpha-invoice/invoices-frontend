import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {TemplateService} from "../services/template.service";

/**
 *
 */
@Component({
  selector: 'main-page',
  templateUrl: 'templates/main-page.component.html',
  styleUrls: ['templates/styles/css/main-page.component.css'],
  directives: [ROUTER_DIRECTIVES],
   providers: [TemplateService]
})
export class MainPageComponent {
  constructor(private templateService: TemplateService) {
  }

  getFile(event: any) {
    this.templateService.getDefaultTemplate();
  }
}