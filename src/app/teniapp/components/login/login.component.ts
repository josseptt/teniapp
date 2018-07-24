import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from '../../services/auth.service';
import {Users} from '../../models/users';

// const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //CREATE FORM GROUP
  form : FormGroup;

  hide = true;
  error = true;

  constructor(private fb : FormBuilder, private router : Router, private authService : AuthService) {
    //INIT FORM WITH VALUES
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  login(users: Users) {
    this.m_login(users);
  }

  m_login(users: Users) {
    this.authService.login(users).then((data) => {
      this.error = true;
      if (data != null) {
        this.router.navigate(['dashboard']);
      }
    }, (err) => {
      this.error = false;
    });
  }
}
