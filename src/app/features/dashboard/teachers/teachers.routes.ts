import { Routes } from '@angular/router';
import { TeachersComponent } from './teachers.component';


export const teacherRoutes: Routes = [
  { path: 'teachers', component: TeachersComponent, children: [

  ]}
];
