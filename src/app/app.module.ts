import { PublicModule } from './@public/pages/public.module';
import { StudentModule } from './@student/pages/student.module';
import { TeacherModule } from './@teacher/pages/teacher.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    PublicModule,
    StudentModule,
    TeacherModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
