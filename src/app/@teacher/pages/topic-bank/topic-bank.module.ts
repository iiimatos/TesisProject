import { TopicBankComponent } from './topic-bank.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicBankRoutingModule } from './topic-bank-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [TopicBankComponent],
  imports: [CommonModule, TopicBankRoutingModule, NgbModule],
})
export class TopicBankModule {}
