import { Routes } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { HomeComponent } from './home/home.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { ExamsComponent } from './exams/exams.component';
import { AddExamMarksComponent } from './add-exam-marks/add-exam-marks.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentCardComponent } from './student-card/student-card.component';
import { ClassCardComponent } from './class-card/class-card.component';
import { ClassesListComponent } from './classes-list/classes-list.component';



export const teacherRoutes: Routes = [
  { path: 'teacher', component: TeachersComponent},
  { path: 'home', component: HomeComponent},
  { path: 'attendance', component: AttendanceComponent },
  {path:'instructions', component: InstructionsComponent},
  { path: 'exams',component:ExamsComponent },
  {path:'add-exam/:id',component:AddExamMarksComponent},
  {path:'StudentList',component:StudentListComponent},
  {path:'StudentCard',component:StudentCardComponent},
  {path: 'class-card',component: ClassCardComponent},
  {path:'classes',component:ClassesListComponent}
];
