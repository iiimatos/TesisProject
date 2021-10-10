import { TopicBankComponent } from './topic-bank.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicBankRoutingModule } from './topic-bank-routing.module';

@NgModule({
  declarations: [TopicBankComponent],
  imports: [CommonModule, TopicBankRoutingModule],
})
export class TopicBankModule {}
