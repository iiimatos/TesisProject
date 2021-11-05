import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopicBankComponent } from './topic-bank.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicBankRoutingModule } from './topic-bank-routing.module';
import { ViewRequestComponent } from '../../core/components/view-request/view-request.component';
import { TemaAddComponent } from '../../core/components/tema-add/tema-add.component';
import { TemaEditComponent } from '../../core/components/tema-edit/tema-edit.component';
import { TemaViewComponent } from '../../core/components/tema-view/tema-view.component';

@NgModule({
  declarations: [
    TopicBankComponent,
    ViewRequestComponent,
    TemaAddComponent,
    TemaEditComponent,
    TemaViewComponent,
  ],
  imports: [
    CommonModule,
    TopicBankRoutingModule,
    ReactiveFormsModule,
    NgbModule,
  ],
})
export class TopicBankModule {}
