import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http: HttpClient) {}

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
