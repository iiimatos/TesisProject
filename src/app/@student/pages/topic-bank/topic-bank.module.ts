import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicBankRoutingModule } from './topic-bank-routing.module';
import { TopicBankComponent } from './topic-bank.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewSolicitudesComponent } from '../../core/components/view-solicitudes/view-solicitudes.component';
import { ViewTemaComponent } from '../../core/components/view-tema/view-tema.component';

@NgModule({
  declarations: [TopicBankComponent, ViewSolicitudesComponent, ViewTemaComponent],
  imports: [CommonModule, TopicBankRoutingModule, NgbModule],
})
export class TopicBankModule {}
