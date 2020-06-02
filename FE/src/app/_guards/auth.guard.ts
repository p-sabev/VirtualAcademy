import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../_services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  flatPermissions: any;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.flatPermissions = JSON.parse(localStorage.getItem('permissionsFlat'));
    if (this.authService.isAuthenticated() && this.flatPermissions) {
      const permissionNeeded = route.data.permission as string;
      return this.getAccess(permissionNeeded);
    } else {
      return this.logOut();
    }
  }

  getAccess(permissionNeeded) {
    return this.flatPermissions[permissionNeeded];
  }

  logOut() {
    this.authService.logout();
    return this.router.navigate(['/login']);
  }
}
