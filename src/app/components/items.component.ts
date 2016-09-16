import {Component, Input} from "@angular/core";
import {Item} from "../models/item";

@Component({
  selector: 'items',
  templateUrl: 'templates/items.component.html'
})
export class ItemsComponent {
  @Input() items : Item[];

}
