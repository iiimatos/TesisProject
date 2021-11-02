import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRequestRoutingModule } from './project-request-routing.module';
import { ProjectRequestComponent } from './project-request.component';


@NgModule({
  declarations: [
    ProjectRequestComponent
  ],
  imports: [
    CommonModule,
    ProjectRequestRoutingModule
  ]
})
export class ProjectRequestModule { }
