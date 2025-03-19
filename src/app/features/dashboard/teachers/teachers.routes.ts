import { Routes } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AddExamMarksComponent } from './add-exam-marks/add-exam-marks.component';



export const teacherRoutes: Routes = [
  { path: 'teacher', component: TeachersComponent},
  { path: 'attendance', component: AttendanceComponent },
  {path:'add-exam/:id',component:AddExamMarksComponent}

];
