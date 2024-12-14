import { Component, HostListener, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-option',
  standalone: false,
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectOptionComponent),
      multi: true
    }
  ]
})
export class SelectOptionComponent implements ControlValueAccessor {
  @Input() options: { label: string, value: string }[] = [];
  selectedOption: { label: string, value: string } | null = null;
  isDisabled = false;
  isDropdownOpen = false;

  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };

  toggleDropdown() {
    if (this.isDisabled) return;

    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      this.onTouched();
    }
  }

  selectOption(option: { label: string, value: string }) {
    if (this.isDisabled) return;

    this.selectedOption = option;
    this.onChange(option.value);
    this.isDropdownOpen = false;
  }

  onButtonKeydown(event: KeyboardEvent) {
    if (this.isDisabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleDropdown();
    }
  }

  onOptionKeydown(event: KeyboardEvent, option: { label: string, value: string }) {
    if (this.isDisabled) return;
    if (event.key === 'Enter') {
      this.selectOption(option);
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('.select-option-container');
    if (!clickedInside) {
      this.isDropdownOpen = false;
    }
  }

  writeValue(value: { label: string, value: string }): void {
    this.selectedOption = value || null;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
