import { Routes } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { AttendanceComponent } from './attendance/attendance.component';

export const teacherRoutes: Routes = [
  { path: '', component: TeachersComponent, children: [
      { path: 'attendance', component: AttendanceComponent },
  ]}
];
