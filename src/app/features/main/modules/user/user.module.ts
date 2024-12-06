import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutes } from './user.routing';

@NgModule({
  imports: [
    CommonModule,
    UserComponent,
    UserRoutes,
  ],
  declarations: [],
})

export class UserModule { }
