import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {constants} from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(public http: HttpClient) {}

  addEmployees(employees: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://' + constants.URL + ':8100/api/v1/auth/employees', employees).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  addUsers(users: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://' + constants.URL + ':8100/api/v1/auth/users', users).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getEmployees(user: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/employees/get/users/' + user).subscribe((res: any) => {
        localStorage.setItem(constants.ID_USER, res.id);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getRoleByUsers(iduser) {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/users/rolebyusers/' + iduser).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getPermissionByRole(idrole) {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/role/permissionbyrole/' + idrole).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  /**
   * DIRECTIONS
   */

  distritoList() {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/distrito/all').subscribe((res: any) => {
        console.log('from server success');
        console.log(res);
        resolve(res);
      }, (err) => {
        console.log('from server error');
        console.log(err);
        reject(err);
      });
    });
  }
}
