import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class PasswordValidatorService {

  public passwordValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const numberPattern = /\d/;
      const isNumberError = !numberPattern.test(control.value);

      if (isNumberError) {
        return { number: true };
      }

      const lowerCasePattern = /.*[a-z].*/;
      const upperCasePattern = /.*[A-Z].*/;
      const isLowerCaseError = !lowerCasePattern.test(control.value);
      const isUpperCaseError = !upperCasePattern.test(control.value);

      if (isLowerCaseError || isUpperCaseError) {
        return { letter: true };
      }

      const specialCharPattern = /\W|_/;
      const isSpecialCharError = !specialCharPattern.test(control.value);

      if (isSpecialCharError) {
        return { specialChar: true };
      }
    }

    return null;
  }

  public repetPasswordValidator(formGroup: FormGroup): void {
    formGroup.controls['password'].valueChanges.subscribe((value: string) => {
      const isError = formGroup.controls['repeatPassword'].value !== value;

      this.setRepeatPasswordError(formGroup, isError);
    });

    formGroup.controls['repeatPassword'].valueChanges.subscribe((value: string) => {
      const isError = formGroup.controls['password'].value !== value;

      this.setRepeatPasswordError(formGroup, isError);
    });
  }

  private setRepeatPasswordError(formGroup: FormGroup, isError: boolean): void {
    if (isError) {
      formGroup.controls['repeatPassword'].setErrors({ passwordsIdentical: true })
    } else {
      formGroup.controls['repeatPassword'].setErrors(null);
    }
  }

}
