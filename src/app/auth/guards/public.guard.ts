import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { Observable, map, tap } from "rxjs";
import { inject } from "@angular/core";


const checkAuthStatus = ():Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAutenticationStatus().pipe(
    tap((isAuthenticated) => {
      if ( isAuthenticated ) {
        router.navigate(['./']);
      }
    }),
    map( isAuthenticated => !isAuthenticated )
  );
};

export const canPublicActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log('CanActivate');
  console.log({ route, state });

  return checkAuthStatus();
};

export const canPublicMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('CanMatch');
  console.log({ route, segments });

  return checkAuthStatus();
};
