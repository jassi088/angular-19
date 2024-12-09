import { Component, Input } from '@angular/core';
import { AbstractControl } from "@angular/forms";
import { ValidatorsService } from "src/app/core/services/validation.service";

@Component({
  selector: 'app-form-field',
  standalone: false,
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css'
})
export class FormFieldComponent {
  @Input() control: AbstractControl | null = null;
  @Input() name?: string;

  constructor() { }

  get error() {
    return ValidatorsService.error(this.control?.errors, this.name);
  }
}
