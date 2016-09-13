import {Component, Input} from "@angular/core";
import {Company} from "../models/company";

@Component({
  selector: 'company',
  templateUrl: 'templates/company.component.html'
})
export class CompanyComponent {
  
  @Input() company: Company;
  /**
   * Here we check if the company is Vat Registered.
   */
  isVatRegistered() {
    return this.company.isVatRegistered
  }
}
