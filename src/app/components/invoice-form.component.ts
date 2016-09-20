import {Component, OnInit} from "@angular/core";
import {Invoice} from "../models/invoice";
import {Company} from "../models/company";
import {Item} from "../models/item";
import {InvoiceService} from "../services/invoice.service";
import {REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES, FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';
import {
  invoiceNumberValidator, nameValidator, molValidator, addressValidator, eikValidator,
  descriptionValidator, quantityValidator, priceWithoutVATValidator, dateValidator, currencyValidator, taxValidator
} from "./custom-validators";
import {AutocompleteService} from "../services/autocomplete.service";

// URL for uploading a template
const UPLOAD_TEMPLATE_URL = 'http://localhost:8080/api/upload';

// 3 MB
const MAX_FILE_SIZE = 3 * 1024 * 1024;

const DOCX_FILE_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

/**
 * Represents a form which submits new invoices
 * to the service. Uses dependency injection to load
 * our service.
 * @class
 */
@Component({
  selector: 'invoice-form',
  templateUrl: 'templates/invoice-form.component.html',
  styleUrls: ['templates/styles/css/invoice-form.component.css'],
  providers: [InvoiceService, AutocompleteService],
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FILE_UPLOAD_DIRECTIVES]
})

export class InvoiceFormComponent implements OnInit{
  invoiceToBeStored: Invoice;
  invoiceForm: FormGroup;
  isFileSizeTooLarge: boolean;
  isFileTypeInvalid: boolean;
  brraCompany:Company;
  date: Date;
  tax: Number;
  currency: string;
  public uploader: FileUploader;
  public senderAutocompletedCompany: Company;
  public recipientAutocompletedCompany: Company;
  formBuilderForReset: FormBuilder;

  constructor(private _invoiceService: InvoiceService, fb: FormBuilder, private _autocompleteService: AutocompleteService) {
    this.date = new Date();

    this.invoiceForm = fb.group({
      'invoiceNumber':['',invoiceNumberValidator],
      'date':[this.date.getFullYear() + '-' + this.date.getMonth() + '-' + this.date.getDate(),
        Validators.compose([Validators.required, dateValidator])],
      sender :fb.group({
        'name':['',Validators.compose([Validators.required, nameValidator])],
        'mol':['',Validators.compose([Validators.required, molValidator])],
        'address':['',Validators.compose([Validators.required, addressValidator])],
        'eik':['',Validators.compose([Validators.required, eikValidator])],
        'isVatRegistered':[false]
      }),
      recipient: fb.group({
        'name': ['', Validators.compose([Validators.required, nameValidator])],
        'mol': ['', Validators.compose([Validators.required, molValidator])],
        'address': ['', Validators.compose([Validators.required, addressValidator])],
        'eik': ['', Validators.compose([Validators.required, eikValidator])],
        'isVatRegistered': [false]
      }),
      'currency':['лв.',Validators.compose([Validators.required, currencyValidator])],
      'tax':['20', Validators.compose([Validators.required, taxValidator])],
      item: fb.group({
        'description': ['', Validators.compose([Validators.required, descriptionValidator])],
        'quantity': ['', Validators.compose([Validators.required, quantityValidator])],
        'priceWithoutVAT': ['', Validators.compose([Validators.required, priceWithoutVATValidator])]
      })
    });
  }

  /**
   * Implemented method from {@link OnInit} interface which
   * is called after the constructor of the class. We instantiate
   * our invoiceToBeStored by an empty Invoice object which we
   * fill from the form.
   */
  ngOnInit() {
    this.invoiceToBeStored = Invoice.createEmptyInvoice();
    this.isFileSizeTooLarge = false;
    this.isFileTypeInvalid = false;
    this.initFileUploader();
    this.formBuilderForReset = new FormBuilder();
    this.brraCompany = Company.createEmptyCompany();
    this.senderAutocompletedCompany = Company.createEmptyCompany();
    this.recipientAutocompletedCompany = Company.createEmptyCompany();
  }

  /**
   * Initialize the FileUploader instance (this.uploader) with basic configurations
   */
  private initFileUploader() {
    // Instantiate a file uploader using an upload URL
    // TODO: Add an authToken to the file uploader when authentication is implemented
    this.uploader = new FileUploader({ url: UPLOAD_TEMPLATE_URL });

    // Set constraints for file size (max 3MB) and file extension (.docx)
    this.uploader.setOptions({
      allowedMimeType: [DOCX_FILE_MIME_TYPE],
      maxFileSize: MAX_FILE_SIZE
    });

    // Hook: Set the method type for uploading an item to 'POST'
    this.uploader.onBeforeUploadItem = (fileItem: any) => {
      fileItem.method = 'POST';
    };

    // Hook: When the user links a file, upload immediately
    this.uploader.onAfterAddingFile = (fileItem: any) => {
      fileItem.upload();
      this.isFileSizeTooLarge = false;
      this.isFileTypeInvalid = false;
    };

    /**
     * Hook: Give feedback to the user if the file he wants to upload is invalid and doesn't meet the constraints.
     * Based on the isFileSizeTooLarge and isFileTypeInvalid values different error messages are displayed in the HTML.
     */
    this.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {
      this.isFileSizeTooLarge = !this.uploader._fileSizeFilter(item);
      this.isFileTypeInvalid = !this.uploader._mimeTypeFilter(item);
    }
  }

  /**
   * This function reset all input fields
   * in the current invoice-form
   */
  resetValues(){
    alert(this.date.getMonth());
    this.invoiceForm = this.formBuilderForReset.group({
      'invoiceNumber': ['', invoiceNumberValidator],
      'date':[this.date.getFullYear() + '-' + (this.date.getMonth()+1)+ '-' + this.date.getDate(),
        Validators.compose([Validators.required, dateValidator])],
      sender: this.formBuilderForReset.group({
        'name': ['', Validators.compose([Validators.required, nameValidator])],
        'mol': ['', Validators.compose([Validators.required, molValidator])],
        'address': ['', Validators.compose([Validators.required, addressValidator])],
        'eik': ['', Validators.compose([Validators.required, eikValidator])],
        'isVatRegistered': [false]
      }),
      recipient:this.formBuilderForReset.group({
        'name': ['', Validators.compose([Validators.required, nameValidator])],
        'mol': ['', Validators.compose([Validators.required, molValidator])],
        'address': ['', Validators.compose([Validators.required, addressValidator])],
        'eik': ['', Validators.compose([Validators.required, eikValidator])],
        'isVatRegistered': [false]
      }),
      'currency':['лв.',Validators.compose([Validators.required, currencyValidator])],
      'tax':['20', Validators.compose([Validators.required, taxValidator])],
      item: this.formBuilderForReset.group({
        'description': ['', Validators.compose([Validators.required, descriptionValidator])],
        'quantity': ['', Validators.compose([Validators.required, quantityValidator])],
        'priceWithoutVAT': ['', Validators.compose([Validators.required, priceWithoutVATValidator])]
      })
    });
  }

  /**
   * The function takes the autocompleted company and sets
   * properties of the sender of the current invoice.
   * @param selectedCompany is  autocompleted company that
   * is taken from brra.
   */
  selectSender(selectedCompany) {
    (<FormControl>this.invoiceForm.find('sender').find('name')).updateValue(selectedCompany.name);
    (<FormControl>this.invoiceForm.find('sender').find('mol')).updateValue(selectedCompany.mol);
    (<FormControl>this.invoiceForm.find('sender').find('address')).updateValue(selectedCompany.address);
  }

  /**
   * The function takes the autocompleted company and sets
   * properties of the recipient of the current invoice.
   * @param selectedCompany  is  autocompleted company that
   * is taken from brra.
   */
  selectRecipient(selectedCompany) {
    (<FormControl>this.invoiceForm.find('recipient').find('name')).updateValue(selectedCompany.name);
    (<FormControl>this.invoiceForm.find('recipient').find('mol')).updateValue(selectedCompany.mol);
    (<FormControl>this.invoiceForm.find('recipient').find('address')).updateValue(selectedCompany.address);
  }

  /**
   * This function checks if the eik of the sender is valid
   * and if is valid make get request to brra with eik parameter.
   * Then parses the returned object to sender autocompleted company.
   */
  filterCompanySender() {
    if (this.invoiceForm.find('sender').find('eik').valid) {
      this._autocompleteService.getCompany(this.invoiceForm.find('sender').find('eik').value).then((data) => {
        this.brraCompany = new Company(null, data.name, data.mol, data.address, data.eik, null, null);
        this.senderAutocompletedCompany = Company.parseOutputObjectToCompany(this.brraCompany);
      }).catch(err => { });
    } else {
      this.senderAutocompletedCompany = Company.createEmptyCompany();
    }
  }

  /**
   * This function checks if the eik of the recipient is valid
   * and if is valid make get request to brra with eik parameter.
   * Then parses the returned object to recipient autocompleted company.
   */
  filterCompanyRecipient() {
    if (this.invoiceForm.find('recipient').find('eik').valid) {
      this._autocompleteService.getCompany(this.invoiceForm.find('recipient').find('eik').value).then((data) => {
        this.brraCompany = new Company(null, data.name, data.mol, data.address, data.eik, null, null);
        this.recipientAutocompletedCompany = Company.parseOutputObjectToCompany(this.brraCompany);
      }).catch(err => { });
    } else {
      this.recipientAutocompletedCompany = Company.createEmptyCompany();
    }
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
  addNewInvoice(invoiceNumber, date, sender, recipient, item, currency, tax) {
    this.updateInvoiceFromForm(invoiceNumber, date, sender, recipient, item, currency, tax);
    this._invoiceService.addInvoice(this.invoiceToBeStored);
  }

  exportInvoice(invoiceNumber, date, sender, recipient, item, currency, tax) {
    this.updateInvoiceFromForm(invoiceNumber, date, sender, recipient, item, currency, tax);

    console.log(this.invoiceToBeStored);
    console.log(tax);
    console.log(this.invoiceToBeStored.tax);

    this._invoiceService.exportInvoice(this.invoiceToBeStored);
  }

  /**
   * Updates the invoiceToBeStored object by storing the parsed form values
   * to the appropriate fields of the Invoice object.
   * @param invoiceNumber string
   * @param sender anonymous object which needs to be mapped to a Company instance
   * @param recipient anonymous object which needs to be mapped to a Company instance
   * @param item anonymous object which needs to be mapped to an Item instance
   */
  private updateInvoiceFromForm(invoiceNumber, date, sender, recipient, item, currency, tax) {
    this.invoiceToBeStored.invoiceNumber = invoiceNumber;
    this.invoiceToBeStored.date = date;
    this.invoiceToBeStored.sender = Company.parseOutputObjectToCompany(sender);
    this.invoiceToBeStored.recipient = Company.parseOutputObjectToCompany(recipient);
    this.invoiceToBeStored.items.push(Item.parseOutputObjectToItem(item));
    this.invoiceToBeStored.currency = currency;
    this.invoiceToBeStored.tax = tax;
  }
}
