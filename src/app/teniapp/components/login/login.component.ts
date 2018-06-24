import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

// const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form : FormGroup;

  constructor(private fb: FormBuilder) {

    this.form = fb.group({
      email: ['', [Validators.required]],
      passwd: ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  login() {
    if (this.form.valid) {
      // this.auth.sendToken(this.form.value.email)
      // this.myRoute.navigate(["home"]);
    }
  }

  getErrorMessage(){
    return false;
  }
}
