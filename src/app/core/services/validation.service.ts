/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';

export class ValidatorsService {
  constructor() { }

  static updateForm(
    group: FormGroup | FormControl | FormArray | AbstractControl,
    values: any
  ) {
    if (group instanceof FormControl) {
      group.setValue(values);
    } else if (group instanceof FormGroup) {
      Object.keys(group.controls).forEach((k) => {
        const control = group.get(k);
        if (values && values[k] !== undefined) {
          ValidatorsService.updateForm(control!, values[k]);
        }
      });
    } else if (group instanceof FormArray) {
      group.controls.forEach((c, index) => {
        if (values[index] !== undefined) {
          ValidatorsService.updateForm(c, values[index]);
        }
      });
    }
  }

  static error(errors: any, fieldName = 'Field') {
    if (!errors) return null;
    for (const propertyName in errors) {
      if (Object.prototype.hasOwnProperty.call(errors, propertyName)) {
        return ValidatorsService.getValidatorErrorMessage(propertyName, {
          ...errors[propertyName],
          fieldName,
        });
      }
    }
    return null;
  }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config: any = {
      required: `Please enter ${validatorValue.fieldName ? `${validatorValue.fieldName}` : ''
        }`,
      verifyRequired: `Please  ${validatorValue.fieldName
        ? `${validatorValue.fieldName}`.toLowerCase()
        : ''
        }`,
      invalid: `Please enter valid ${validatorValue.fieldName
        ? `${validatorValue.fieldName}`.toLowerCase()
        : ''
        }`,
      selectRequired: `Please select  ${validatorValue.fieldName ? validatorValue.fieldName.toLowerCase() : ''
        } `,
      compare: 'Passwords do not match',
      min: `Minimum value required ${validatorValue.min ? validatorValue.min : ''
        }`,
      max: `Maximum value should be ${validatorValue.max ? validatorValue.max : ''
        }`,
      maxlength: `Maximum word limit reached`,
      minlength: `Minimum ${validatorValue.requiredLength ? validatorValue.requiredLength : ''
        } characters are required`,
      // 'phonelength': 'Phone number should be between 7-10 digits',
      emailAlreadyExsist: 'Email address is already exsist.',
      invalidPercentage: `Please enter valid percentage.`,
      phonelength: 'Please enter valid phone number',
      invalidName: 'Enter a valid name',
      invalidEmailAddress: 'Invalid email address',
      invalidPassword: 'Please enter password with at least 5 characters',
      invalidNumber: 'Enter positive numeric values only',
      invalidPhoneNumber: 'Enter a valid phone number',
      invalidCardNumber: 'Please enter a valid credit/debit card number',
      invalidCVVNumber: 'Enter a valid CVV code',
      invalidCardExpiry: 'Invalid expiry date',
      invalidUrl: 'Enter a valid url starting with http://',
      invalidTaxId: 'Enter a valid TaxId',
      invalidFaxNumber: 'Enter a valid fax number',
      invalidZip: 'Please enter a valid zip code',
      invalidInput: 'Blank space is not allowed',
      timeOverLap: 'Time should not be overlaps.',
      timeNotInEventRange: `${validatorValue.fieldName ? validatorValue.fieldName : 'Time'
        } should be in event time range.`,
      endTimeBeforeStartTime: `${validatorValue.fieldName ? validatorValue.fieldName : 'End time'
        } should be greater than start time.`,
      invalidGoal: 'Please enter valid goal. ',
      invalidYouTube: 'Please enter a valid youtube url',
      invalidAccountNumber: 'Please enter a valid account number',
      invalidEmployeeId: 'Please enterzeroNotAllowed valid format',
      specialCharacter: 'Special character are not allowed',
      price: `Please enter valid ${validatorValue.fieldName ? validatorValue.fieldName.toLowerCase() : ''
        }.`,
      otpLength: 'Fill the complete OTP to verify',
      NumberLength: 'Enter a valid phone number',
      oneSpecialCharacter: `Password must contain at least one special character.`,
      arrayMinLength: `Minimum ${validatorValue.requiredLength || ''} ${validatorValue.requiredLength === 1 ? 'item is' : 'items are'} required.`,
      arrayMaxLength: `Maximum ${validatorValue.requiredLength || ''} ${validatorValue.requiredLength === 1 ? 'item is' : 'items are'} allowed.`,
    };
    return config[validatorName];
  }

  static required(control: AbstractControl) {
    if (!control.value) {
      return { required: true };
    }
    return null;
  }

  static verifyRequired(control: AbstractControl) {
    if (!control.value) {
      return { verifyRequired: true };
    }
    return null;
  }

  static selectRequired(control: AbstractControl) {
    if (!control.value) {
      return { selectRequired: true };
    }
    return null;
  }

  static compareValidator(control1: string, control2: string): ValidatorFn {
    return function matchPassword(c: AbstractControl) {
      if (
        c.get(control1)?.value &&
        c.get(control2)?.value &&
        c.get(control1)?.value !== c.get(control2)?.value
      ) {
        c.get(control2)?.setErrors({ compare: true });
        return { invalid: true };
      } else {
        // c.get(control2)?.setErrors();
        return null;
      }
    };
  }

  static spaceValidator(control: any) {
    if (control.value) {
      const v = `${control.value}`;
      if (v.replace(/\s+/g, '')) {
        return null;
      } else {
        return { invalidInput: true };
      }
    }
    return null;
  }

  static numberFieldRequiredValidator(control: any) {
    if (control.value) {
      return null;
    } else {
      return { required: true };
    }
  }

  static employeeId(control: any) {
    // RFC 2822 compliant regex
    if (control.value) {
      if (`${control.value}`.match(/^(\w+)?\d+(\w+)?$/)) {
        return null;
      } else {
        return { invalidEmployeeId: true };
      }
    }
    return null;
  }

  static price(control: any) {
    const isValid = `${control.value}`.match(/[1-9]+(\0?\\.[0-9][0-9]?)?/);
    if (isValid?.length) {
      return null;
    } else {
      return { price: true };
    }
  }

  static specailCharacter(control: any) {
    // RFC 2822 compliant regex
    if (control.value) {
      if (`${control.value}`.match(/^[0-9a-zA-Z ]+$/)) {
        return null;
      } else {
        return { specialCharacter: true };
      }
    }
    return null;
  }

  static fullNameValidator(control: any) {
    // RFC 2822 compliant regex
    if (control.value) {
      const str = control.value.replace(/\s+/g, '');

      if (
        control.value.match(/^([a-z])+([a-zA-Z0-9 .,-@&#!'\\$\\s]*)$/i) &&
        str.length > 0
      ) {
        return null;
      } else {
        return { invalidName: true };
      }
    }
    return null;
  }

  static OtpLength(control: AbstractControl) {
    if (control.value) {
      const str = control.value.replace(/\s+/g, '');
      if (str.length >= 4) {
        return null;
      } else {
        return { otpLength: true };
      }
    }
    return null;
  }

  static nameValidator(control: any) {
    // RFC 2822 compliant regex
    if (control.value) {
      const str = control.value.replace(/\s+/g, '');

      if (
        control.value.match(/^([a-z])+([a-zA-Z0-9 .,-@&#!'\\$\\s]*)$/i) &&
        str.length > 0
      ) {
        return null;
      } else {
        return { invalidName: true };
      }
    }
    return null;
  }

  static emailValidator(control: any) {
    // RFC 2822 compliant regex
    if (control.value) {
      if (
        control.value.match(
          /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|glass|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
        )
      ) {
        return null;
      } else {
        return { invalidEmailAddress: true };
      }
    }
    return null;
  }

  static numberValidator(control: any) {
    const value = `${control.value}`;
    if (value && value.match(/^[0-9]*$/)) {
      return null;
    } else {
      return { invalidNumber: true };
    }
  }

  static percentageValidator(control: any) {
    const value = `${control.value}`;
    if (value) {
      if (
        value.match(/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/g)
      ) {
        return null;
      } else {
        return { invalidPercentage: true };
      }
    }
    return null;
  }

  static phoneNumberValidator(control: any) {
    if (control.value) {
      if (control.value.match(/^\d{15}$/)) {
        return null;
      } else if (
        control.value.match(
          /^(\+\d{1,3}[- ]?)?\(?([0-15]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        )
      ) {
        return null;
      } else if (
        control.value.match(
          /^(\+\d{1,3}[- ]?)?\(?([0-9]{2})\)?[-. ]?([0-15]{4})[-. ]?([0-9]{4})$/
        )
      ) {
        return null;
      } else {
        return { invalidPhoneNumber: true };
      }
    }
    return null;
  }

  static phoneNumberWithoutDialCodeValidator(control: any) {
    if (control.value) {
      const p = `${control.value}`.match(/\d+/);
      if (`${control.value}`.match(/^\d{10,10}$/)) {
        return null;
      } else if (p && p?.length < 7) {
        return { phonelength: true };
      } else {
        return { invalidPhoneNumber: true };
      }
    }
    return null;
  }

  static phoneMinLength(control: AbstractControl) {
    if (control.value) {
      const str = control.value.replace(/\s+/g, '');
      if (str.length >= 7) {
        return null;
      } else {
        return { 'NumberLength': true };
      }
    }
    return null;
  }

  static isLengthMet(control: any) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    const value = `${control.value}`;
    if (value) {
      if (value.match(/\s/g)) {
        return { invalidInput: true };
      }
      if (value.match(/.{7,}$/)) {
        return null;
      } else {
        return { invalidPassword: true };
      }
    }
    return null;
  }

  static passwordValidator(control: any) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    const value = `${control.value}`;
    if (value) {
      if (value.match(/\s/g)) {
        return { invalidInput: true };
      }
      if (value.match(/^[a-zA-Z0-9!@#$%^&*]{5,100}$/)) {
        return null;
      } else {
        return { invalidPassword: true };
      }
    }
    return null;
  }

  static urlValidator(control: any) {
    if (control.value) {
      if (
        control.value.match(
          /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}[.]{0,1}/g
        )
      ) {
        return null;
      } else {
        return { invalidUrl: true };
      }
    }
    return null;
  }

  static isSpecialCharMet(control: any) {
    if (control.value) {
      if (control.value.match(/[!@#$%*<.,]/)) {
        return null;
      } else {
        return { oneSpecialCharacter: true };
      }
    }
    return null;
  }

  static arrayMinLengthValidator(min: number): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;

      if (Array.isArray(value) && value.length >= min) {
        return null;
      }

      return {
        arrayMinLength: {
          requiredLength: min,
          actualLength: Array.isArray(value) ? value.length : 0,
        },
      };
    };
  }

  static arrayMaxLengthValidator(max: number): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;

      if (Array.isArray(value) && value.length <= max) {
        return null;
      }

      return {
        arrayMaxLength: {
          maxLength: max,
          actualLength: Array.isArray(value) ? value.length : 0,
        },
      };
    };
  }


}
