import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicRequestRegisterRoutingModule } from './topic-request-register-routing.module';
import { TopicRequestRegisterComponent } from './topic-request-register.component';


@NgModule({
  declarations: [
    TopicRequestRegisterComponent
  ],
  imports: [
    CommonModule,
    TopicRequestRegisterRoutingModule
  ]
})
export class TopicRequestRegisterModule { }
