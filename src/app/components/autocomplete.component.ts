import {Component, ElementRef} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Company} from "../models/company";

@Component({
  selector: 'autocomplete',
  template: `
         <div class="container" >
            <div class="input-field col s12">
              <input id="country" type="text" class="validate filter-input" [(ngModel)]=query (keyup)=filter()>
               <!--<input type="text" placeholder="recipient eik" [formControl]="invoiceForm.find('recipient').controls['eik']">-->
              <label for="country">Company</label>
            </div>
            <div class="suggestions" *ngIf="filteredList.length > 0">
                <ul *ngFor="let item of filteredList" >
                    <li >
                        <a (click)="select(item)">{{item}}</a>
                    </li>
                </ul>
            </div>
        </div>  	
          `,
  directives: [ROUTER_DIRECTIVES]
})

export class AutocompleteComponent {
  public query = '';
  public companiesDb: Company[] = [
    new Company(1,'ДЕМЕТРА 2007 ООД','ЕМИЛ ТОНЧЕВ ГЕОРГИЕВ','ул.ДАМЕ ГРУЕВ НОВ, гр. Русе, БЪЛГАРИЯ','123456789',false,''),
    new Company(2,'М-КАР ТУНИНГ - МАРИН ЧОМАКОВ ЕТ','МАРИН АНГЕЛОВ ЧОМАКОВ','ул.ШЕЙНОВО 28, гр. Горна Оряховица, БЪЛГАРИЯ, 5100','123123123',false,''),
    new Company(3,'БИЛДИНГ - МСМ ЕООД','МИЛЕНА ЛЮБЕНОВА ЦОЛОВСКА','КИРИЛ Д.АВРАМОВ 32, гр. Свищов, БЪЛГАРИЯ, 5250','321321321',true,'12345'),
    new Company(4,'ДЕМЕТРА ЮНИОН ЕООД','Кольо Иванов  Иванов','ул. ДАМЕ ГРУЕВ 3, гр. Русе, БЪЛГАРИЯ, 7015','987654321',true,'3333'),
    new Company(5,'ЗЕФИР 77 ЕООД','ЕМИЛ ЙОРДАНОВ ПАНДОВ','ж.к СВЕТА ТРОИЦА, бл. 303Б, гр. София, БЪЛГАРИЯ, 1309','999999999',false,'1111')
  ];

  public filteredList = [];
  public elementRef;

  constructor(myElement: ElementRef) {
    this.elementRef = myElement;
  }


  filter() {
    if (this.query.length == 9){
      this.companiesDb.forEach(company => {

      });
      this.filteredList = this.companiesDb.filter(function(el){
        return el.indexOf(this.query) > -1;
      }.bind(this));
    }else{
      this.filteredList = [];
    }
  }

  select(item){
    this.query = item;
    this.filteredList = [];
  }
}
