import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicBankRoutingModule } from './topic-bank-routing.module';
import { TopicBankComponent } from './topic-bank.component';


@NgModule({
  declarations: [
    TopicBankComponent
  ],
  imports: [
    CommonModule,
    TopicBankRoutingModule
  ]
})
export class TopicBankModule { }
