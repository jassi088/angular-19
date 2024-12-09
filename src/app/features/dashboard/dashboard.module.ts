import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { DashboardRoutes } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { ComponentsModule } from '@app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutes,
  ],
  providers: [
    provideHttpClient(),
  ],
})
export class DashboardModule { }