import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { States } from 'src/types/States';
import { IconOptions } from '../icon-button/icon-button.component';

const numberValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return isNaN(control.value) ? { notANumber: { value: control.value } } : null;
};

@Component({
  selector: 'app-user-checkout-form',
  templateUrl: './user-checkout-form.component.html',
  styleUrls: ['./user-checkout-form.component.scss'],
})
export class UserCheckoutFormComponent {
  checkoutForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(35),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(35),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    streetAddress: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    state: new FormControl('', Validators.required),
    zipCode: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(5),
      numberValidator,
    ]),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16),
      numberValidator,
    ]),
    cvv: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
      numberValidator,
    ]),
  });

  stateOptions = States;

  iconOptions = IconOptions;

  lightIcon = false;

  constructor(private router: Router) {}

  get firstName() {
    return this.checkoutForm.get('firstName');
  }
  get lastName() {
    return this.checkoutForm.get('lastName');
  }
  get email() {
    return this.checkoutForm.get('email');
  }
  get streetAddress() {
    return this.checkoutForm.get('streetAddress');
  }
  get state() {
    return this.checkoutForm.get('state');
  }
  get zipCode() {
    return this.checkoutForm.get('zipCode');
  }
  get cardNumber() {
    return this.checkoutForm.get('cardNumber');
  }
  get cvv() {
    return this.checkoutForm.get('cvv');
  }

  onFormSubmit() {
    console.log('check it out boss =>', this.checkoutForm.value);
    this.router.navigate(['confirmation']);
  }
}
