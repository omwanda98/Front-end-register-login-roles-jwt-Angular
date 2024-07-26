import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser: User | null = this.authService.currentUserValue;

    if (currentUser && currentUser.authorities) {
      // Check if route is restricted by role
      if (route.data['roles']) {
        const userRoles: string[] = currentUser.authorities.map((auth: { authority: string }) => auth.authority);
        if (!route.data['roles'].some((role: string) => userRoles.includes(role))) {
          // Role not authorized so redirect to home page
          this.router.navigate(['/']);
          return false;
        }
      }
      // Authorized so return true
      return true;
    }

    // Not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
