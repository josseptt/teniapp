import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {constants} from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(public http: HttpClient) {}

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

  cantonList() {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/canton/all').subscribe((res: any) => {
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
