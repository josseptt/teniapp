import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {constants} from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(public http: HttpClient) {}

  /**
   * ROLE
   */

  roleList() {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/role/all').subscribe((res: any) => {
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

  getRole(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/role/get/' + id).subscribe((res: any) => {
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

  addRole(role: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://' + constants.URL + ':8100/api/v1/role/insert', role).subscribe((res: any) => {
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

  updateRole(role: any, id: number) {
    return new Promise((resolve, reject) => {
      this.http.post('http://' + constants.URL + ':8100/api/v1/role/update/' + id, role).subscribe((res: any) => {
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

  deleteRole(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/role/delete/' + id).subscribe((res: any) => {
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

  /**
   * PERMISSION
   */

  permissionList() {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/role/permission/all').subscribe((res: any) => {
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

  getPermission(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/permission/get/' + id).subscribe((res: any) => {
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

  addPermission(permission: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://' + constants.URL + ':8100/api/v1/permission/insert', permission).subscribe((res: any) => {
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

  updatePermission(permission: any, id: number) {
    return new Promise((resolve, reject) => {
      this.http.post('http://' + constants.URL + ':8100/api/v1/permission/update/' + id, permission).subscribe((res: any) => {
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

  deletePermission(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/permission/delete/' + id).subscribe((res: any) => {
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
