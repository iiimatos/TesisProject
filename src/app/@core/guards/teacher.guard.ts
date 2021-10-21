import { AuthService } from 'src/app/@core/services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TeacherGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}
  id: number = 0;
  role: string = '';

  async canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (this.authService.getSession() !== null) {
      const dataDecode: any = this.decodeToken();
      if (dataDecode.exp < new Date().getTime() / 1000) {
        this.router.navigate(['/']);
        return false;
      }
      const {
        id,
        role: { name },
      } = await this.authService.getMe().toPromise();
      this.id = id;
      this.role = name;

      if (this.role === 'Teacher' || 'Coordinator') {
        return true;
      }
      return false;
    }
    return false;
  }

  decodeToken() {
    return jwtDecode(this.authService.getSession().jwt || '');
  }
}
