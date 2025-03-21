import { teacherRoutes } from './features/dashboard/teachers/teachers.routes';

 import { Routes } from '@angular/router';
 import { adminRoutes } from './features/dashboard/admin/admin.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'admin/home', pathMatch: 'full' }, 
  { path: 'admin', children: adminRoutes }, 
  { path: 'teacher', children: teacherRoutes },
];
