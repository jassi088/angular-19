import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: false,
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent {
  @Input() title = ''; // Tab title
  @Input() active = false; // Whether the tab is active
  @Output() tabClick = new EventEmitter<void>();

  // Method to emit a click event when the tab is clicked
  activateTab() {
    this.tabClick.emit();
  }
}
