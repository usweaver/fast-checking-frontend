import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserStore } from '../stores/user.store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userStore: UserStore
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      this.userStore.getUserInfos();
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
