import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import * as jwt_decode from "jwt-decode";
import {EmployeesService} from '../../services/employees.service';
import {Router} from "@angular/router";
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-sidenav',
  templateUrl: './dashboard-sidenav.component.html',
  styleUrls: ['./dashboard-sidenav.component.scss'],
})

export class DashboardSidenavComponent implements OnDestroy {

  mobileQuery: MediaQueryList;

  fillerNav = [];

  private _mobileQueryListener: () => void;

  token : any;
  user : string;
  employees_name : string = 'Username';
  image : string = '../../../../assets/img/img-login.png';
  container : number;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private employeesService: EmployeesService,
              private router : Router, private authService : AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.container = 5;
    this.getrole();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getrole() {
    if (this.authService.isLoggedIn()) {
      this.token = this.getDecodedAccessToken(this.authService.getToken());
      this.user = this.token.sub;

      this.employeesService.getEmployees(this.user).then((data) => {
        let employees: any = data;
        //data is employees
        this.employees_name = employees.firstname + ' ' + employees.lastname;

        if (employees.image !== null) this.image = employees.image;
        //obtain employee's role and permissions
        this.employeesService.getRoleByUsers(employees.id).then((data: any) => {
          //obtain permission
          this.employeesService.getPermissionByRole(data.id).then((data: any[]) => {
            data.forEach((value, element) => {
              this.fillerNav[element] = [3];
              this.fillerNav[element][0] = value.link;
              this.fillerNav[element][1] = value.label;
              this.fillerNav[element][2] = value.description;
            });
          }, (err) => {
            console.log(err);
          });
        }, (err) => {
          console.log(err);
        });
      }, (err) => {
        console.log(err);
      });
    }
  }

  onMenu(value: string) {
    if (value === 'main') this.container = 0;
    if (value === 'product') this.container = 1;
    if (value === 'inventory') this.container = 2;
    if (value === 'admin') this.container = 3;
    if (value === 'sales') this.container = 4;
    if (value === 'purchase') this.container = 5;
  }

  logout() {
    this.router.navigate(['']);
    this.authService.logout();
  }

  editProfile() {
    this.container = 6;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch(err) {
      console.log(err);
      return null;
    }
  }
}
