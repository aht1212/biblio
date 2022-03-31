
import { sha1 } from '@angular/compiler/src/i18n/digest';
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
    this.api.get_something('user?q='+email).subscribe(res=>{
      this.user = res
      return this.user


      })
      if (email === this.user[0].login[0].email && password === this.user[0].login[0].pass) {
        this.setToken('8757565676545678765');
        localStorage.setItem('token', email.token)


        return of({ name: this.user[0].nom, prenom: this.user[0].prenom});
      }else{
      return throwError(new Error('Failed to login'));
    }
}
}
