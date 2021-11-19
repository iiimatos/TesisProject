import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import { UserAddComponent } from '../../core/components/user-add/user-add.component';
import { UserEditComponent } from '../../core/components/user-edit/user-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    MaintenanceComponent,
    UserAddComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
  ],
})
export class MaintenanceModule {}
