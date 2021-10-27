import { FormsModule } from '@angular/forms';
import { AddRequestComponent } from './../../core/components/add-request/add-request.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TopicRequestRoutingModule } from './topic-request-routing.module';
import { TopicRequestComponent } from './topic-request.component';

@NgModule({
  declarations: [TopicRequestComponent, AddRequestComponent],
  imports: [CommonModule, TopicRequestRoutingModule, FormsModule, NgbModule],
})
export class TopicRequestModule {}
