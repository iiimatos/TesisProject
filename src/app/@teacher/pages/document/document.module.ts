import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { DocumentComponent } from './document.component';
import { AddProjectComponent } from '../../core/components/add-project/add-project.component'

@NgModule({
  declarations: [
    DocumentComponent,
    AddProjectComponent
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
  ]
})
export class DocumentModule { }
