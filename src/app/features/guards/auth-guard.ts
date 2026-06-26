import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../user/services/auth';
import { OwnerAuthService } from '../owner/Services/owner-auth.service';

export const userGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) return true;

  router.navigate(['/user/login']);
  return false;
};

export const ownerGuard: CanActivateFn = () => {
  const auth = inject(OwnerAuthService);
  const router = inject(Router);

  if (auth.isOwnerLoggedIn()) return true;

  router.navigate(['/owner/login']);
  return false;
};
