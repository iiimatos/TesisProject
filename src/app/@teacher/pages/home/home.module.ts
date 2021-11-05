import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ViewRequestHomeComponent } from '../../core/components/view-request-home/view-request-home.component';


@NgModule({
  declarations: [
    HomeComponent,
    ViewRequestHomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
