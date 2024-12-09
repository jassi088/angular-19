import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from './form-field/form-field.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';

@NgModule({
  declarations: [FormFieldComponent, MultiSelectComponent],
  imports: [CommonModule],
  exports: [FormFieldComponent, MultiSelectComponent],
})
export class ComponentsModule { }
