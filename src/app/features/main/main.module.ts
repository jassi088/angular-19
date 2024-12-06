import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutes } from './main.routing';
import { UserModule } from './modules/user/user.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutes,
    UserModule,
  ],
})
export class MainModule { }
