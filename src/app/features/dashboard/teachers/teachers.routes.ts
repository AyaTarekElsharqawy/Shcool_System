import { Routes } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { AttendanceComponent } from './attendance/attendance.component';


export const teacherRoutes: Routes = [
  { path: 'teacher', component: TeachersComponent},
  { path: 'attendance', component: AttendanceComponent },
  
];
