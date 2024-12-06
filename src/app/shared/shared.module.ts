import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { Base64Pipe } from './pipes/base64.pipe';
import { CountriesDirective } from './countries.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploaderModule,
  ],
  declarations: [PaginationComponent, Base64Pipe, CountriesDirective],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PaginationComponent,
    FileUploaderModule,
    CountriesDirective,
  ],
})
export class SharedModule { }
