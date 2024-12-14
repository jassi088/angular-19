import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  standalone: false,
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  @Input() data = ''; // Data passed to component
  @Output() closed = new EventEmitter<boolean>(); // Event emitter to notify parent component when dialog is closed

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  close(result: any) {
    this.closed.emit(result); // Emit result (true or false) when the button is clicked
  }
}
