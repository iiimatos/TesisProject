import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicRequestRoutingModule } from './topic-request-routing.module';
import { TopicRequestComponent } from './topic-request.component';


@NgModule({
  declarations: [
    TopicRequestComponent
  ],
  imports: [
    CommonModule,
    TopicRequestRoutingModule
  ]
})
export class TopicRequestModule { }
