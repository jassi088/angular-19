import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { LocalStorageService } from '@app/core/services/localStorage.service';
import { ValidatorsService } from '@app/core/services/validation.service';
import { ConfirmationComponent } from '@app/components/confirmation/confirmation.component';
import { DialogService } from '@app/components/dialog/dialog.service';

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

  onMenuSelect(option: string) {
    console.log('Selected Menu Item:', option);
  }

  constructor(private localStorageService: LocalStorageService, private router: Router, private dialogService: DialogService) {
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

  activeTab = 'Settings'; // Default active tab
  onActiveTabChange(tabTitle: string) {
    this.activeTab = tabTitle;
    console.log('Active Tab:', this.activeTab); // Log the active tab or use it as needed
  }

  openDialog() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.dialogService.open(ConfirmationComponent, { data: 'Hello' }).then((result: any) => {
      console.log('Dialog result:', result);
    });
  }
}
