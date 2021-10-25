import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import { UserAddComponent } from '../../core/components/user-add/user-add.component';

@NgModule({
  declarations: [MaintenanceComponent, UserAddComponent],
  imports: [CommonModule, MaintenanceRoutingModule],
})
export class MaintenanceModule {}
