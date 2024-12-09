import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  @Input() data: unknown;
  @Output() close = new EventEmitter<unknown>();

  closeDialog(result?: unknown): void {
    this.close.emit(result);
  }
}
