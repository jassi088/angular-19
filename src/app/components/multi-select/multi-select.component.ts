import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  standalone: false,
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent {
  @Input() options: { label: string, value: string }[] = [];
  @Input() selectedValues: string[] = [];
  @Output() selectedValuesChange = new EventEmitter<string[]>();

  isDropdownOpen = false;

  toggleSelection(value: string) {
    const index = this.selectedValues.indexOf(value);
    if (index === -1) {
      this.selectedValues.push(value);
    } else {
      this.selectedValues.splice(index, 1);
    }
    this.selectedValuesChange.emit(this.selectedValues);
  }

  isSelected(value: string): boolean {
    return this.selectedValues.includes(value);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
