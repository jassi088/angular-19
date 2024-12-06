import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { AuthComponent } from './auth.component';
import { AuthRoutes } from './auth.routing';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutes,
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
  ],
  providers: [
    provideHttpClient(),
  ],
})
export class AuthModule { }
