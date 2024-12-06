import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  @Input() data: any;
  @Output() close = new EventEmitter<any>();

  closeDialog(result?: any): void {
    this.close.emit(result);
  }
}
