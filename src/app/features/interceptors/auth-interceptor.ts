import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const isUserLogged = localStorage.getItem('isUserLogged') === 'true';
  const isOwnerLogged = localStorage.getItem('isOwnerLogged') === 'true';

  let token: string | null = null;

  if (isUserLogged) {
    token = localStorage.getItem('UserToken');
  } else if (isOwnerLogged) {
    token = localStorage.getItem('OwnerToken');
  }

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};