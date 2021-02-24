import {Injectable} from '@angular/core';
import {FormControl, ValidatorFn} from '@angular/forms';
import {BooleanFn} from '../../../models/boolean-fn.type';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() {
  }


  // validator for checking if the input consists of only whitespaces
  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : {whitespace: true};
  }


  // custom validator that fire once the value is entered
  conditionalValidator(predicate: BooleanFn,
                       validator: ValidatorFn,
                       errorNamespace?: string): ValidatorFn {
    return (formControl => {
      if (!formControl.parent) {
        return null;
      }
      let error = null;
      if (predicate()) {
        error = validator(formControl);
      }
      if (errorNamespace && error) {
        const customError = {};
        customError[errorNamespace] = error;
        error = customError;
      }
      return error;
    });
  }
}
