import { FormsModule } from '@angular/forms';
import { AddRequestComponent } from './../../core/components/add-request/add-request.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicRequestRoutingModule } from './topic-request-routing.module';
import { TopicRequestComponent } from './topic-request.component';

@NgModule({
  declarations: [TopicRequestComponent, AddRequestComponent],
  imports: [CommonModule, TopicRequestRoutingModule, FormsModule],
})
export class TopicRequestModule {}
