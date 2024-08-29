import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class CustomValidators {
  static matching(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (matchingControl!.errors && !matchingControl!.errors?.['matching']) {
        return null;
      }

      if (control!.value !== matchingControl!.value) {
        const error = { matching: 'Passwords do not match.' };
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        return null;
      }
    };
  }
}
