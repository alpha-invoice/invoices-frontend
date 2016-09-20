import {FormControl} from "@angular/forms";

export function invoiceNumberValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^\d{10}$/)) {
    return {invalidInvoiceNumber: true};
  }
}
export function dateValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)) {
    return {invalidInvoiceDate: true};
  }
}
export function nameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^.{1,100}$/)) {
    return {invalidCompanyName: true};
  }
}
export function molValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^.{1,100}$/)) {
    return {invalidCompanyMol: true};
  }
}
export function addressValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^.{1,255}$/)) {
    return {invalidCompanyAddress: true};
  }
}
export function eikValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^\d{9}$/)) {
    return {invalidCompanyEik: true};
  }
}
export function currencyValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^.{1,9}$/)) {
    return {invalidCurrency: true};
  }
}
export function taxValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^\d{1,3}$/)) {
    return {invalidTax: true};
  }
}
export function descriptionValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^.{1,70}$/)) {
    return {invalidDescription: true};
  }
}
export function quantityValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^\d{1,20}$/)) {
    return {invalidDescription: true};
  }
}
export function priceWithoutVATValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^\d{1,20}$/)) {
    return {invalidDescription: true};
  }
}
