import { Routes } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AddExamMarksComponent } from './add-exam-marks/add-exam-marks.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentCardComponent } from './student-card/student-card.component';



export const teacherRoutes: Routes = [
  { path: 'teacher', component: TeachersComponent},
  { path: 'attendance', component: AttendanceComponent },
  {path:'add-exam/:id',component:AddExamMarksComponent},
  {path:'StudentList',component:StudentListComponent},
  {path:'StudentCard',component:StudentCardComponent}

];
