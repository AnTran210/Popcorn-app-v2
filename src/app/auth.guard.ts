import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const username = localStorage.getItem('username');

    if (username !== null && username !== '') {
      // Người dùng đã đăng nhập, cho phép truy cập route
      return true;
    } else {
      // Người dùng chưa đăng nhập, chuyển hướng về trang login
      console.warn('Bạn chưa đăng nhập. Đang chuyển hướng về trang đăng nhập.');
      return this.router.createUrlTree(['/login']); // Điều hướng về route '/login'
      // Hoặc: return this.router.navigate(['/login']); và sau đó return false;
      // Tuy nhiên, trả về UrlTree trực tiếp là cách được khuyến khích hơn trong Angular 7+
    }
  }
}
