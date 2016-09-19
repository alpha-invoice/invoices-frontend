import {Component, OnInit, Inject} from "@angular/core";
import {Invoice} from "../models/invoice";
import {Company} from "../models/company";
import {Item} from "../models/item";
import {InvoiceService} from "../services/invoice.service";
import {REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES, FormGroup, FormBuilder, Validators} from "@angular/forms";
import { FILE_UPLOAD_DIRECTIVES, FileUploader, FileSelectDirective } from 'ng2-file-upload';
import {
  invoiceNumberValidator, nameValidator, molValidator, addressValidator, eikValidator,
  descriptionValidator, quantityValidator, priceWithoutVATValidator
} from "./custom-validators";

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
  styleUrls: [ 'templates/styles/css/invoice-form.component.css' ],
  providers:[InvoiceService],
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FILE_UPLOAD_DIRECTIVES]
})

export class InvoiceFormComponent implements OnInit {
  invoiceToBeStored:Invoice;
  invoiceForm: FormGroup;
  isFileSizeTooLarge: boolean;
  isFileTypeInvalid: boolean;
  sender:Company;
  recipient:Company;
  public uploader: FileUploader;

  constructor(private _invoiceService: InvoiceService, fb: FormBuilder) {
    this.invoiceForm = fb.group({
      'invoiceNumber':['',invoiceNumberValidator],
      sender :fb.group({
        'name':['',Validators.compose([Validators.required, nameValidator])],
        'mol':['',Validators.compose([Validators.required, molValidator])],
        'address':['',Validators.compose([Validators.required, addressValidator])],
        'eik':['',Validators.compose([Validators.required, eikValidator])],
        'isVatRegistered':[false]
      }),
      recipient: fb.group({
        'name':['',Validators.compose([Validators.required, nameValidator])],
        'mol':['',Validators.compose([Validators.required, molValidator])],
        'address':['',Validators.compose([Validators.required, addressValidator])],
        'eik':['',Validators.compose([Validators.required, eikValidator])],
        'isVatRegistered':[false]
      }),
      item: fb.group({
        'description':['',Validators.compose([Validators.required, descriptionValidator])],
        'quantity':['',Validators.compose([Validators.required, quantityValidator])],
        'priceWithoutVAT':['',Validators.compose([Validators.required, priceWithoutVATValidator])]
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
    this.sender = Company.createEmptyCompany();
    this.recipient = Company.createEmptyCompany();
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
    }

    // Hook: When the user links a file, upload immediately
    this.uploader.onAfterAddingFile = (fileItem: any) => {
      fileItem.upload();
      this.isFileSizeTooLarge = false;
      this.isFileTypeInvalid = false;
    }

    /**
     * Hook: Give feedback to the user if the file he wants to upload is invalid and doesn't meet the constraints.
     * Based on the isFileSizeTooLarge and isFileTypeInvalid values different error messages are displayed in the HTML.
     */
    this.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {
      this.isFileSizeTooLarge = !this.uploader._fileSizeFilter(item);
      this.isFileTypeInvalid = !this.uploader._mimeTypeFilter(item);
    }
  }

  public companiesDb: Company[] = [
    new Company(1,'ДЕМЕТРА 2007 ООД','ЕМИЛ ТОНЧЕВ ГЕОРГИЕВ','ул.ДАМЕ ГРУЕВ НОВ, гр. Русе, БЪЛГАРИЯ','123456789',false,''),
    new Company(2,'М-КАР ТУНИНГ - МАРИН ЧОМАКОВ ЕТ','МАРИН АНГЕЛОВ ЧОМАКОВ','ул.ШЕЙНОВО 28, гр. Горна Оряховица, БЪЛГАРИЯ, 5100','123123123',false,''),
    new Company(3,'БИЛДИНГ - МСМ ЕООД','МИЛЕНА ЛЮБЕНОВА ЦОЛОВСКА','КИРИЛ Д.АВРАМОВ 32, гр. Свищов, БЪЛГАРИЯ, 5250','321321321',true,'12345'),
    new Company(4,'ДЕМЕТРА ЮНИОН ЕООД','Кольо Иванов  Иванов','ул. ДАМЕ ГРУЕВ 3, гр. Русе, БЪЛГАРИЯ, 7015','987654321',true,'3333'),
    new Company(5,'ЗЕФИР 77 ЕООД','ЕМИЛ ЙОРДАНОВ ПАНДОВ','ж.к СВЕТА ТРОИЦА, бл. 303Б, гр. София, БЪЛГАРИЯ, 1309','999999999',false,'1111')
  ];


  public senderFilteredList = [];
  public recipientFilteredList = [];

  selectSender(item){
    this.sender.mol = item.mol;
    this.sender.name = item.name;
    this.sender.address = item.address;
  }

  selectRecipient(item){
    this.recipient.mol = item.mol;
    this.recipient.name = item.name;
    this.recipient.address = item.address;
  }

  filterCompanySender() {
    console.log(this.senderFilteredList);
    this.senderFilteredList = [];
    if (this.invoiceForm.find('sender').find('eik').value.length == 9){
      this.companiesDb.forEach(company => {
        if(company.eik == this.invoiceForm.find('sender').find('eik').value){
          this.senderFilteredList.push(company);
        }
      });
    }else{
      this.senderFilteredList = [];
    }
  }

  filterCompanyRecipient(){
    console.log(this.recipientFilteredList);
    this.senderFilteredList = [];
    if (this.invoiceForm.find('recipient').find('eik').value.length == 9){
      this.companiesDb.forEach(company => {
        if(company.eik == this.invoiceForm.find('recipient').find('eik').value){
          this.recipientFilteredList.push(company);
        }
      });
    }else{
      this.recipientFilteredList = [];
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
  addNewInvoice(invoiceNumber, sender, recipient, item) {
    this.updateInvoiceFromForm(invoiceNumber, sender, recipient, item);
    this._invoiceService.addInvoice(this.invoiceToBeStored);
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
