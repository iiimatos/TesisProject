import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectRequestComponent } from './project-request.component';

const routes: Routes = [{ path: '', component: ProjectRequestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRequestRoutingModule { }
