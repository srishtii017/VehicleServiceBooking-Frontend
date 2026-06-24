import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const anyRoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isUserLogged = localStorage.getItem('isUserLogged') === 'true';
  const isOwnerLogged = localStorage.getItem('isOwnerLogged') === 'true';

  if (isUserLogged || isOwnerLogged) {
    return true;
  }

  router.navigate(['/']); 
  return false;
};