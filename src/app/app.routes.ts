import { teacherRoutes } from './features/dashboard/teachers/teachers.routes';

 import { Routes } from '@angular/router';
 import { adminRoutes } from './features/dashboard/admin/admin.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'admin/home', pathMatch: 'full' }, 
  { path: 'admin', children: adminRoutes }, 
  { path: 'teacher', children: teacherRoutes },

];
//import { ClassesListComponent} from './classes-list/classes-list.component';
// import { StudentsListComponent } from './students-list/students-list.component';
// import { ClassCardComponent } from './class-card/class-card.component';
// import { StudentCardComponent } from './student-card/student-card.component';

// export const routes: Routes = [

//   {
//     path:'classes-list',
//     component: ClassesListComponent,
//     title: 'الفصول'

//   },
//   {
//     path:'students-list',
//     component: StudentsListComponent,
//     title: 'الطلاب'
//   },
//   {
//     path: 'class-card',
//     component: ClassCardComponent
//   },
//   {
//     path:'student-card',
//     component: StudentCardComponent
//   }
// ];