import { Routes } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { HomeComponent } from './home/home.component';
import { InstructionsComponent } from './instructions/instructions.component';


export const teacherRoutes: Routes = [
  { path: 'teacher', component: TeachersComponent},
  { path: 'home', component: HomeComponent},
  { path: 'attendance', component: AttendanceComponent },
  {path:'instructions', component: InstructionsComponent}
];
