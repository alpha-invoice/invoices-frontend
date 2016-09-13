import {FormControl} from "@angular/forms";

export function invoiceNumberValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^\d{10}$/)) {
    return {invalidInvoiceNumber: true};
  }
}
export function nameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^[а-яА-Я0-9\s]{1,50}$/)) {
    return {invalidCompanyName: true};
  }
}
export function molValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^[а-яА-Я\s]{1,50}$/)) {
    return {invalidCompanyMol: true};
  }
}
export function addressValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^[а-яА-Я0-9\s]{1,70}$/)) {
    return {invalidCompanyAddress: true};
  }
}
export function eikValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^\d{9}$/)) {
    return {invalidCompanyEik: true};
  }
}
