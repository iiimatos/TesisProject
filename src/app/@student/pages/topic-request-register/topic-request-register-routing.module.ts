import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicRequestRegisterComponent } from './topic-request-register.component';

const routes: Routes = [
  {
    path:'', component: TopicRequestRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRequestRegisterRoutingModule { }
