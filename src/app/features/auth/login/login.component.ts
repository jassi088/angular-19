import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '@app/core/services/localStorage.service';
import { ValidatorsService } from '@app/core/services/validation.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      ValidatorsService.required,
      ValidatorsService.emailValidator,
      ValidatorsService.spaceValidator,
    ]),
    password: new FormControl('', [
      ValidatorsService.required,
      ValidatorsService.spaceValidator,
    ]),
  });

  onSubmit() {
    if (this.form.valid) {
      this.localStorageService.user = {
        id: '12345',
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123',
        imgUrl: 'https://example.com/profile.jpg',
        phone: 1234567890,
        status: 'active',
        name: 'John Doe',
        role: {
          id: 1,
          name: 'Admin',
          code: 'ADMIN'
        }
      };

      this.localStorageService.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsInVzZXJuYW1lIjoiZHVtbXl1c2VyIiwicm9sZSI6InVzZXIiLCJleHBpcmVkSW4iOiIxYTI5YjY4YzU5NzI2ZDZkZjRlMmRkZjExNjYzODI3N2QiLCJpYXQiOjE2NDg5NTU5NzQsImV4cCI6MTY0ODk1OTk3NH0.7vGz2XvfxVYFCh8BdW2gE6deP1pg9gOahSboKnA5zck";

      this.router.navigate(['dashboard'])

    } else {
      this.form.markAllAsTouched();
      console.log('Form is not valid');
    }
  }
}

