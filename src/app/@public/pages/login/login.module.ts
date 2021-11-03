import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../core/components/spinner/spinner.component';

@NgModule({
  declarations: [LoginComponent, SpinnerComponent],
  imports: [CommonModule, LoginRoutingModule, FormsModule, ReactiveFormsModule],
})
export class LoginModule {}
