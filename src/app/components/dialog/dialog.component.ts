/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: false,
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Output() afterClosed = new EventEmitter<any>();
  isOpen = false;

  close(result: any) {
    this.isOpen = false;
    this.afterClosed.emit(result); // Emit the result when closing
  }

  open() {
    this.isOpen = true;
  }
}
