import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const appToken = localStorage.getItem('appToken');
    const isLoggedIn = appToken && appToken.trim().indexOf('') !== -1;

    if (isLoggedIn) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}

@Injectable()
export class AuthGuardLogin implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const appToken = localStorage.getItem('appToken');
    const isLoggedIn = appToken && appToken.trim().indexOf('') !== -1;

    if (isLoggedIn) {
      return this.router.parseUrl('/dashboard');
    } else {
      return true;
    }
  }
}
