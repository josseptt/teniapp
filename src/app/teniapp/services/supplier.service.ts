import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {constants} from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(public http: HttpClient) {}

  supplierList() {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/supplier/all').subscribe((res: any) => {
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

  getSupplier(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/supplier/get/' + id).subscribe((res: any) => {
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

  addSupplier(size: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://' + constants.URL + ':8100/api/v1/supplier/insert', size).subscribe((res: any) => {
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

  updateSupplier(size: any, id: number) {
    return new Promise((resolve, reject) => {
      this.http.post('http://' + constants.URL + ':8100/api/v1/supplier/update/' + id, size).subscribe((res: any) => {
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
