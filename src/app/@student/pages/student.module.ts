import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { SidebarComponent } from '../core/components/sidebar/sidebar.component';
import { FooterComponent } from '../core/components/footer/footer.component';
import { AsideComponent } from '../core/components/aside/aside.component';
import { NavbarComponent } from '../core/components/navbar/navbar.component';

@NgModule({
  declarations: [
    StudentComponent,
    SidebarComponent,
    FooterComponent,
    AsideComponent,
    NavbarComponent,
  ],
  imports: [CommonModule, StudentRoutingModule],
})
export class StudentModule {}
