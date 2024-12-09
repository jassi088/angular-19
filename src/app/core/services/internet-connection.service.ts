import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternetConnectionService {
  // Use a BehaviorSubject to keep track of the connection status
  private onlineStatus = new BehaviorSubject<boolean>(navigator.onLine);

  // Observable to get the current connection status
  onlineStatus$ = this.onlineStatus.asObservable();

  constructor() {
    // Listen to the 'online' and 'offline' events to update the status
    window.addEventListener('online', () => this.updateConnectionStatus(true));
    window.addEventListener('offline', () => this.updateConnectionStatus(false));
  }

  // Update the connection status and emit the new value
  private updateConnectionStatus(isOnline: boolean): void {
    this.onlineStatus.next(isOnline);
  }

  // Optionally, expose a method to check the current connection status
  get isOnline(): boolean {
    return navigator.onLine;
  }
}

