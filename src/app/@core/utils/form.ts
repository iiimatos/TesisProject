import { FormGroup, FormControl } from '@angular/forms';

export const validateAllFormFields = (formGroup: FormGroup) => {
  //{1}
  Object.keys(formGroup.controls).forEach((field) => {
    //{2}
    const control = formGroup.get(field); //{3}
    if (control instanceof FormControl) {
      //{4}
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      //{5}
      validateAllFormFields(control); //{6}
    }
  });
};
