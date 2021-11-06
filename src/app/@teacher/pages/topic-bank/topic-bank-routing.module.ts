import { TopicBankComponent } from './topic-bank.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TopicBankComponent,
  },
  { path: 'project-edit/:id',
   loadChildren: () => import('../../core/components/project-edit/project-edit.module').then(m => m.ProjectEditModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicBankRoutingModule {}
