import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private dataStore: {
    user: User[]
  };
  private _user: BehaviorSubject<User[]>;


  constructor(private http: HttpClient) {
    this.dataStore = {user: []};
    this._user = new BehaviorSubject<User[]>([]);
  }

  login(username: string, passwd: string) {
    localStorage.setItem("loggedUser", 'nacho')
  }

  getToken() {
    return localStorage.getItem("loggedUser")
  }

  isLoggednIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem("loggedUser");
    // this.myRoute.navigate(["login"]);
  }

}
