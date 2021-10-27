import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentGuard } from 'src/app/@core/guards/student.guard';
import { StudentComponent } from './student.component';

const routes: Routes = [
  {
    path: 'student',
    component: StudentComponent,
    canActivateChild: [StudentGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'topicbank',
        loadChildren: () =>
          import('./topic-bank/topic-bank.module').then(
            (m) => m.TopicBankModule
          ),
      },
      {
        path: 'topicrequest',
        loadChildren: () =>
          import('./topic-request/topic-request.module').then(
            (m) => m.TopicRequestModule
          ),
      },
      {
        path: 'document',
        loadChildren: () =>
          import('./document/document.module').then((m) => m.DocumentModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
