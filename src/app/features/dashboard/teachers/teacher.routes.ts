import { Routes } from '@angular/router';
import { TeachersComponent } from './teachers.component';
// import { TeacherHomeComponent } from './home/home.component';
// import { TeacherClassesComponent } from './classes/classes.component';
// import { TeacherStudentsComponent } from './students/students.component';
// import { TeacherAttendanceComponent } from './attendance/attendance.component';
// import { TeacherExamsComponent } from './exams/exams.component';
// import { TeacherComplaintsComponent } from './complaints/complaints.component';
// import { TeacherFeesComponent } from './fees/fees.component';

export const teacherRoutes: Routes = [
  { path: 'teachers', component: TeachersComponent, children: [
    //   { path: 'home', component: TeacherHomeComponent },
    //   { path: 'classes', component: TeacherClassesComponent },
    //   { path: 'students', component: TeacherStudentsComponent },
    //   { path: 'attendance', component: TeacherAttendanceComponent },
    //   { path: 'exams', component: TeacherExamsComponent },
    //   { path: 'complaints', component: TeacherComplaintsComponent },
    //   { path: 'fees', component: TeacherFeesComponent },
  ]}
];
