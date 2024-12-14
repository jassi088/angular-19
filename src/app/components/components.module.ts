import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from './form-field/form-field.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectOptionComponent } from './select-option/select-option.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab/tab.component';
import { DialogComponent } from './dialog/dialog.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
  declarations: [FormFieldComponent, MultiSelectComponent, SelectOptionComponent, InputFieldComponent, MenuComponent, TabsComponent, TabComponent, DialogComponent, ConfirmationComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FormFieldComponent, MultiSelectComponent, SelectOptionComponent, InputFieldComponent, MenuComponent, TabsComponent, TabComponent, DialogComponent, ConfirmationComponent],
})
export class ComponentsModule { }
