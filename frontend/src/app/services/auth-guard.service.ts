import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean | Observable<boolean> {
    if (!this.authService.isUserLoggedIn$.value) {
      this.router.navigate(["signup"]);
      return false;
    } 
    return this.authService.isUserLoggedIn$;
  }
}
