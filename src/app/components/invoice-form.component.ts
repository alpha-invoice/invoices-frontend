import {Component, OnInit, Inject} from "@angular/core";
import {Invoice} from "../models/invoice";
import {Company} from "../models/company";
import {Item} from "../models/item";
import {InvoiceService} from "../services/invoice.service";
import {
  REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES, FormGroup, FormBuilder, Validators,
  AbstractControl, FormGroupName
} from "@angular/forms";
import {invoiceNumberValidator, nameValidator, molValidator, addressValidator, eikValidator} from "./custom-validators";

/**
 * Represents a form which submits new invoices
 * to the service. Uses dependency injection to load
 * our service.
 * @class
 */
@Component({
  selector: 'invoice-form',
  templateUrl: 'templates/invoice-form.component.html',
  providers:[InvoiceService],
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class InvoiceFormComponent implements OnInit{
  invoiceToBeStored:Invoice;
  invoiceForm: FormGroup;
  // sender: FormGroup;
  // invoiceNumber: AbstractControl;
  // senderName: AbstractControl;
  // senderMol: AbstractControl;
  // senderAddress: AbstractControl;
  // senderEik: AbstractControl;

  constructor(private _invoiceService: InvoiceService, fb: FormBuilder) {
    this.invoiceForm = fb.group({
      'invoiceNumber':['',invoiceNumberValidator],
      sender :fb.group({
        'senderName':['',Validators.compose([Validators.required, nameValidator])],
        'senderMol':['',Validators.compose([Validators.required, molValidator])],
        'senderAddress':['',Validators.compose([Validators.required, addressValidator])],
        // 'senderEik':['',Validators.compose([Validators.required, eikValidator])]
      })
    });
    // this.invoiceNumber = this.invoiceForm.controls['invoiceNumber'];
    // this.senderName = this.invoiceForm.controls['senderName'];
    // this.senderMol = this.invoiceForm.controls['senderMol'];
    // this.senderAddress = this.invoiceForm.controls['senderAddress'];
    // this.senderEik = this.invoiceForm.controls['senderEik'];
  }

  // invoiceForm = new FormGroup({
  //   sender: new FormGroup({
  //     name: new FormControl('', Validators.pattern("\A[а-яА-Я0-9\s]{1,50}\Z")),
  //     mol: new FormControl('',Validators.pattern("\A[а-яА-Я\s]{1,50}\Z")),
  //     address: new FormControl('',Validators.pattern("\A[а-яА-Я0-9\s]{1,70}\Z")),
  //     eik: new FormControl('',Validators.pattern("\A\d{9}\Z"))
  //   }),
  //   recipient: new FormGroup({
  //     name: new FormControl('', Validators.pattern("\A[а-яА-Я0-9\s]{1,50}\Z")),
  //     mol: new FormControl('',Validators.pattern("\A[а-яА-Я\s]{1,50}\Z")),
  //     address: new FormControl('',Validators.pattern("\A[а-яА-Я0-9\s]{1,70}\Z")),
  //     eik: new FormControl('',Validators.pattern("\A\d{9}\Z"))
  //   }),
  //   item: new FormGroup({
  //     description: new FormControl('', Validators.pattern("\A[а-яА-Я0-9\s]{1,70}\Z")),
  //     quantity: new FormControl('',Validators.pattern("\A\d{1,9}\Z")),
  //     priceWithoutVAT: new FormControl('',Validators.pattern("\A\d{1,9}\Z")),
  //   })
  // });

  /**
   * Implemented method from {@link OnInit} interface which
   * is called after the constructor of the class. We instantiate
   * our invoiceToBeStored by an empty Invoice object which we
   * fill from the form.
   */
  ngOnInit() {
    this.invoiceToBeStored = Invoice.createEmptyInvoice();
  }

  /**
   * EventHandler method which is called when the form Add button
   * is clicked. It stores the updated invoiceToBeStored object by
   * passing it to the invoice service.
   * @param invoiceNumber string passed from the form input.
   * @param sender anonymous object passed from the form input.
   * @param recipient anonymous object passed from the form input.
   * @param item anonymous object passed from the form input.
   */
  addNewInvoice(invoiceNumber, sender, recipient, item) {
    this.updateInvoiceFromForm(invoiceNumber, sender, recipient, item);
    //this._invoiceService.addInvoice(this.invoiceToBeStored);
  }

  /**
   * Updates the invoiceToBeStored object by storing the parsed form values
   * to the appropriate fields of the Invoice object.
   * @param invoiceNumber string
   * @param sender anonymous object which needs to be mapped to a Company instance
   * @param recipient anonymous object which needs to be mapped to a Company instance
   * @param item anonymous object which needs to be mapped to an Item instance
   */
  private updateInvoiceFromForm(invoiceNumber, sender, recipient, item) {
    this.invoiceToBeStored.invoiceNumber = invoiceNumber;
    this.invoiceToBeStored.sender = Company.parseOutputObjectToCompany(sender);
    this.invoiceToBeStored.recipient = Company.parseOutputObjectToCompany(recipient);
    this.invoiceToBeStored.items.push(Item.parseOutputObjectToItem(item));
  }
}
