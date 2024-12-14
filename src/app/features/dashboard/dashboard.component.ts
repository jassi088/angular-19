import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { LocalStorageService } from '@app/core/services/localStorage.service';
import { ValidatorsService } from '@app/core/services/validation.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  form: FormGroup;
  options = [
    { label: 'Reading', value: 'reading' },
    { label: 'Traveling', value: 'traveling' },
    { label: 'Coding', value: 'coding' },
    { label: 'Sports', value: 'sports' },
    { label: 'Music', value: 'music' },
  ];


  menuOptions = [
    { label: 'Profile', value: 'profile' },
    { label: 'Settings', value: 'settings' },
    { label: 'Logout', value: 'logout' }
  ];

  onMenuSelect(option: string) {
    console.log('Selected Menu Item:', option);
  }

  constructor(private localStorageService: LocalStorageService, private router: Router) {
    this.form = new FormGroup({
      name: new FormControl('', ValidatorsService.required),
      hobbies: new FormControl([], ValidatorsService.arrayMinLengthValidator(1)),
      hobby: new FormControl('', ValidatorsService.selectRequired),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched()
    }
  }

  reset() {
    this.form.reset()
  }

  logout() {
    this.localStorageService.clearStorage()
    this.router.navigate(['auth/login']);
  }
}
