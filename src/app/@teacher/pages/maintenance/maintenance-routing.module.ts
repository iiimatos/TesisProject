import { MaintenanceComponent } from './maintenance.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceComponent,
  },
  { 
    path: 'user-edit/:id', 
    loadChildren: () => import('../../core/components/user-edit/user-edit.module').then(m => m.UserEditModule)
  },
  { path: 'user-add', loadChildren: () => import('../../core/components/user-add/user-add.module').then(m => m.UserAddModule) },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceRoutingModule {}
