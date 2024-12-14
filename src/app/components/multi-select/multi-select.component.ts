import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  standalone: false,
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true
    }
  ]
})
export class MultiSelectComponent implements ControlValueAccessor {
  @Input() options: { label: string, value: string }[] = [];
  @Input() selectedValues: string[] = [];
  @Input() placeholder = '';
  isDropdownOpen = false;
  isDisabled = false;

  private onChange: (value: string[]) => void = () => { };
  private onTouched: () => void = () => { };

  toggleSelection(value: string) {
    if (this.isDisabled) return;

    const index = this.selectedValues.indexOf(value);
    if (index === -1) {
      this.selectedValues.push(value);
    } else {
      this.selectedValues.splice(index, 1);
    }
    this.onChange(this.selectedValues);
    this.onTouched();
  }

  isSelected(value: string): boolean {
    return this.selectedValues.includes(value);
  }

  toggleDropdown() {
    if (this.isDisabled) return;
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('.multi-select-container');
    if (!clickedInside) {
      this.isDropdownOpen = false;
    }
  }

  writeValue(value: string[]): void {
    this.selectedValues = value || [];
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
