import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from './form-field/form-field.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectOptionComponent } from './select-option/select-option.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [FormFieldComponent, MultiSelectComponent, SelectOptionComponent, InputFieldComponent, MenuComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FormFieldComponent, MultiSelectComponent, SelectOptionComponent, InputFieldComponent, MenuComponent],
})
export class ComponentsModule { }
