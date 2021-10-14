import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';
import { NavbarComponent } from '../core/components/navbar/navbar.component';
import { SidebarComponent } from '../core/components/sidebar/sidebar.component';
import { AsideComponent } from '../core/components/aside/aside.component';
import { FooterComponent } from '../core/components/footer/footer.component';


@NgModule({
  declarations: [
    TeacherComponent,
    NavbarComponent,
    SidebarComponent,
    AsideComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
