import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Color} from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http: HttpClient) {}

  /*==================================/
  /===============COLOR===============/
  /==================================*/

  colorList() {
    return new Promise((resolve, reject) => {
      this.http.get('http://192.81.218.205:8100/api/v1/color/all').subscribe((res: any) => {
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

  getColor(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get('http://192.81.218.205:8100/api/v1/color/get/' + id).subscribe((res: any) => {
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

  addColor(color: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://192.81.218.205:8100/api/v1/color/insert', color).subscribe((res: any) => {
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

  updateColor(color: any, id: number) {
    return new Promise((resolve, reject) => {
      this.http.post('http://192.81.218.205:8100/api/v1/color/update/' + id, color).subscribe((res: any) => {
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

  deleteColor(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get('http://192.81.218.205:8100/api/v1/color/delete/' + id).subscribe((res: any) => {
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

  /*==================================/
  /===============SIZE================/
  /==================================*/

  sizeList() {
    return new Promise((resolve, reject) => {
      this.http.get('http://192.81.218.205:8100/api/v1/size/all').subscribe((res: any) => {
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

  /*==========================================/
  /===============PRODUCT BRAND===============/
  /==========================================*/

  productBrandList() {
    return new Promise((resolve, reject) => {
      this.http.get('http://192.81.218.205:8100/api/v1/productbrand/all').subscribe((res: any) => {
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

  /*==========================================/
  /===============PRODUCT MODEL===============/
  /==========================================*/

  productModelList() {
    return new Promise((resolve, reject) => {
      this.http.get('http://192.81.218.205:8100/api/v1/productmodel/all').subscribe((res: any) => {
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

  /*====================================/
  /===============PRODUCT===============/
  /====================================*/

  productList() {
    return new Promise((resolve, reject) => {
      this.http.get('http://192.81.218.205:8100/api/v1/product/all').subscribe((res: any) => {
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
