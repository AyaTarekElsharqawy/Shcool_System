import { teacherRoutes } from './features/dashboard/teachers/teachers.routes';
import { credentiaRoutes } from './features/dashboard/credentia/credentia.routes';
 import { Routes } from '@angular/router';
 import { adminRoutes } from './features/dashboard/admin/admin.routes';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/signup', pathMatch: 'full' },
  {path: 'auth', children: credentiaRoutes},
  { path: 'admin', children: adminRoutes , canActivate:[authGuard],data:{roles:['admin']}},
  { path: 'teacher', children: teacherRoutes,canActivate:[authGuard],data:{roles:['teacher']} },

  { path: '**', redirectTo: 'auth/login' } 

];
