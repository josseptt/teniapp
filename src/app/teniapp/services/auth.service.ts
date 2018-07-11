import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Users} from '../models/users';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private dataStore: {
    user: Users[]
  };

  private _user: BehaviorSubject<Users[]>;

  constructor(private http: HttpClient) {
    this.dataStore = {user: []};
    this._user = new BehaviorSubject<Users[]>([]);
  }

  login(users: Users) {
    return new Promise((resolve, reject) => {
      this.http.post('http://192.81.218.205:8100/api/v1/auth/login', users).subscribe((res: any) => {
        localStorage.setItem('token', res.token);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isLoggednIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    // this.myRoute.navigate(["login"]);
  }

}
