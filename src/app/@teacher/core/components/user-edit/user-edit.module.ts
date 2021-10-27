import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserEditRoutingModule } from './user-edit-routing.module';
import { UserEditComponent } from './user-edit.component';


@NgModule({
  declarations: [
    UserEditComponent
  ],
  imports: [
    CommonModule,
    UserEditRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserEditModule { }
