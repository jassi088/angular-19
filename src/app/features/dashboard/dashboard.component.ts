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
  selectedValues: string[] = [];

  onSelectionChange(selected: string[]) {
    this.selectedValues = selected;
    this.form.get('hobbies')?.setValue(selected);
  }

  constructor(private localStorageService: LocalStorageService, private router: Router) {
    this.form = new FormGroup({
      hobbies: new FormControl(this.selectedValues, ValidatorsService.minLengthValidator(1)),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Selected hobbies:', this.selectedValues);
    } else {
      console.log(this.form.value);
    }
  }

  logout() {
    this.localStorageService.clearStorage()
    this.router.navigate(['auth/login']);
  }
}
