import { TopicBankComponent } from './topic-bank.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TopicBankComponent,
  },
  { path: 'project-request', loadChildren: () => import('../../core/components/project-request/project-request.module').then(m => m.ProjectRequestModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicBankRoutingModule {}
