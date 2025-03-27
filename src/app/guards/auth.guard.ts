import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  if (!userRole) {
    router.navigate(['/login']);
    return false;
  }
  if (!token) {
    router.navigate(['/login']); // إعادة التوجيه إلى صفحة تسجيل الدخول
    return false;
  }

  const allowedRoles = route.data?.['roles'] as string[];
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
