import {FormControl} from "@angular/forms";

export function invoiceNumberValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^\d{10}$/)) {
    return {invalidInvoiceNumber: true};
  }
}
export function nameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^.{1,100}$/)) {
    return {invalidCompanyName: true};
  }
}
export function molValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^[-.а-яА-Яa-zA-Z\s*]{1,100}$/)) {
    return {invalidCompanyMol: true};
  }
}
export function addressValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^.{1,100}$/)) {
    return {invalidCompanyAddress: true};
  }
}
export function eikValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^\d{9}$/)) {
    return {invalidCompanyEik: true};
  }
}
export function descriptionValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^.{1,70}$/)) {
    return {invalidDescription: true};
  }
}
export function quantityValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^[-,.а-яА-Яa-zA-Z\d\s*]{1,20}$/)) {
    return {invalidDescription: true};
  }
}
export function priceWithoutVATValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^[-,.а-яА-Яa-zA-Z\d\s*]{1,20}$/)) {
    return {invalidDescription: true};
  }
}
