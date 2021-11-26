
import { Injectable, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import {  Observable, of, throwError } from 'rxjs';
import { ApiService } from '../api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  user !: any;

  constructor(
    private router: Router,
    private api: ApiService
    ) {}

  setToken(token: string): void{
    localStorage.setItem('token', token)

  }

  getToken():string|null{
    return localStorage.getItem('token')
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  login({ email, password }: any): Observable<any> {
    this.api.get_something('user').subscribe(res=>{
      this.user = res
      return this.user
      })
      if (email === this.user.email && password === this.user.pass) {
        this.setToken('abcdefghijklmnopqrstuvwxyz');
        return of({ name: 'Admin', email: 'lol'});
      }else{
      return throwError(new Error('Failed to login'));
    }
}
}
