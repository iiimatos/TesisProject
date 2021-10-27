import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserAddRoutingModule } from './user-add-routing.module';
import { UserAddComponent } from './user-add.component';


@NgModule({
  declarations: [
    UserAddComponent
  ],
  imports: [
    CommonModule,
    UserAddRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserAddModule { }
