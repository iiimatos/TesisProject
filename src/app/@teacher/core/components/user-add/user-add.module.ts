import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAddRoutingModule } from './user-add-routing.module';
import { UserAddComponent } from './user-add.component';


@NgModule({
  declarations: [
    UserAddComponent
  ],
  imports: [
    CommonModule,
    UserAddRoutingModule
  ]
})
export class UserAddModule { }
