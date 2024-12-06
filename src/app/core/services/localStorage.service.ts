import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '@app/core/constants/local-storage.enum';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private router: Router) { }

  /** Get the token from localStorage */
  get token(): string {
    return localStorage.getItem(LocalStorage.TOKEN) ?? '';
  }

  /** Set the token in localStorage */
  set token(token: string) {
    localStorage.setItem(LocalStorage.TOKEN, token);
  }

  /** Get the user from localStorage */
  get user(): User {
    const userJson = localStorage.getItem(LocalStorage.USER);
    if (userJson) {
      try {
        return JSON.parse(userJson) as User;
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        return new User();
      }
    }
    return new User();
  }

  /** Set the user in localStorage */
  set user(user: User) {
    try {
      localStorage.setItem(LocalStorage.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  }

  /** Clear all stored data */
  clearStorage(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
