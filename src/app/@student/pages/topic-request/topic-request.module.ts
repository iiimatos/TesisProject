import { EditRequestComponent } from './../../core/components/edit-request/edit-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRequestComponent } from './../../core/components/add-request/add-request.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TopicRequestRoutingModule } from './topic-request-routing.module';
import { TopicRequestComponent } from './topic-request.component';
import { ViewRequestComponent } from '../../core/components/view-request/view-request.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    TopicRequestComponent,
    AddRequestComponent,
    ViewRequestComponent,
    EditRequestComponent,
  ],
  imports: [
    CommonModule,
    TopicRequestRoutingModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TopicRequestModule {}
