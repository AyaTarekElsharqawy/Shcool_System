
 import { Routes } from '@angular/router';
 //Admin Links
 import { adminRoutes } from './features/dashboard/admin/admin.routes';
 import { teacherRoutes } from './features/dashboard/teachers/teacher.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'admin/home', pathMatch: 'full' }, 
  { path: 'admin', children: adminRoutes }, 
  { path: 'teacher', children: teacherRoutes },

];