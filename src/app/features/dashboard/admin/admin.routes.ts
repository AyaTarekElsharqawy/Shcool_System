import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExamsComponent } from './exams/exams.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ClassesListComponent } from './classes-list/classes-list.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { SubscriptionsAndSalariesComponent } from './subscriptions-and-salaries/subscriptions-and-salaries.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { TeachersTableComponent } from './teachers-table/teachers-table.component';
import { StudentsTableComponent } from './students-table/student.component';
import { ClassCardComponent } from './class-card/class-card.component';
import { StudentCardComponent } from './student-card/student-card.component';
import { AttendanceComponent } from './attendance/attendance.component';

export const adminRoutes: Routes = [
    { path: '', redirectTo: '/admin/home', pathMatch: 'full' },

    {
        path:'home',
        component: HomeComponent,
    },
    {
        path:'exams',
        component:ExamsComponent
    },
    { path: 'students', component: StudentComponent },
    { path: 'students/:query', component: StudentComponent }, 
    { path: 'teachers', component: TeacherComponent },
    { path: 'teachers/:query', component: TeacherComponent }, 
    {path: 'classes',component:ClassesListComponent},
    {path: 'attendance',component:AttendanceComponent},
    {path: 'students-list',component:StudentsListComponent},
    {path: 'fees',component:SubscriptionsAndSalariesComponent},
    {path: 'complaints',component:ComplaintsComponent},
    {path: 'teachersFees',component:TeachersTableComponent},
    {path: 'studentsFees',component:StudentsTableComponent},
    {
        path: 'class-card',
        component: ClassCardComponent
      },
    {
        path:'student-card',
        component: StudentCardComponent
    }
];
