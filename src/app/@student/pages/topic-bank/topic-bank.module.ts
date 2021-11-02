import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicBankRoutingModule } from './topic-bank-routing.module';
import { TopicBankComponent } from './topic-bank.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewSolicitudesComponent } from '../../core/components/view-solicitudes/view-solicitudes.component';

@NgModule({
  declarations: [TopicBankComponent, ViewSolicitudesComponent],
  imports: [CommonModule, TopicBankRoutingModule, NgbModule],
})
export class TopicBankModule {}
