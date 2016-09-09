import {Component, OnInit} from "@angular/core";
// import { FORM_DIRECTIVES } from "@angular/common";
import {Invoice} from "../models/invoice";
import {Company} from "../models/company";
import {Item} from "../models/item";
import {InvoiceService} from "../services/invoice.service";
import { FILE_UPLOAD_DIRECTIVES, FileUploader, FileSelectDirective } from 'ng2-file-upload';

// URL for uploading a template
const UPLOAD_TEMPLATE_URL = 'http://localhost:8080/api/upload';

/**
 * Represents a form which submits new invoices
 * to the service. Uses dependency injection to load
 * our service.
 * @class
 */
@Component({
  selector: 'invoice-form',
  templateUrl: 'templates/invoice-form.component.html',
  providers: [InvoiceService],
  directives: [FILE_UPLOAD_DIRECTIVES]
})
export class InvoiceFormComponent implements OnInit {
  invoiceToBeStored: Invoice;
  public uploader: FileUploader;

  constructor(private _invoiceService: InvoiceService) {
  }

  /**
   * Implemented method from {@link OnInit} interface which
   * is called after the constructor of the class. We instantiate
   * our invoiceToBeStored by an empty Invoice object which we
   * fill from the form.
   */
  ngOnInit() {
    this.invoiceToBeStored = Invoice.createEmptyInvoice();
    this.initFileUploader();
  }

  /**
   * Initialize the FileUploader instance (this.uploader) with basic configurations
   */
  private initFileUploader() {
    // Instantiate a file uploader using an upload URL
    // TODO: Add an authToken to the file uploader when authentication is implemented
    this.uploader = new FileUploader({url: UPLOAD_TEMPLATE_URL});

    // Set constraints for file size (max 3MB) and file extension (.docx)
    this.uploader.setOptions({allowedMimeType: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
                              maxFileSize: 3 * 1024 * 1024});

    // Hook: Set the method type for uploading an item to 'POST'                          
    this.uploader.onBeforeUploadItem = (fileItem: any) => {
      fileItem.method = 'POST';
    }

    // Hook: When the user links a file, upload immediately
    this.uploader.onAfterAddingFile = (fileItem: any) => {
      fileItem.upload();
    }

    /**
     * Hook: Give feedback to the user if the file he wants to upload is invalid and doesn't meet the constraints. Currently works with console.log() statements
     * TODO: Add UI error messages
     */
    this.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {
      if(filter.name == 'mimeType') {
        console.log('invalid file extension');
      }
      if(filter.name == 'fileSize') {
        console.log('max file size 3MB');
      }
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
