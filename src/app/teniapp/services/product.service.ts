import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {constants} from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http: HttpClient) {}

  /*******************************************************************
   * COLOR
   */

  colorList() {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/color/all').subscribe((res: any) => {
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
      this.http.get('http://' + constants.URL + ':8100/api/v1/color/get/' + id).subscribe((res: any) => {
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
      this.http.post('http://' + constants.URL + ':8100/api/v1/color/insert', color).subscribe((res: any) => {
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
      this.http.post('http://' + constants.URL + ':8100/api/v1/color/update/' + id, color).subscribe((res: any) => {
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
      this.http.get('http://' + constants.URL + ':8100/api/v1/color/delete/' + id).subscribe((res: any) => {
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

  /*******************************************************************
   * SIZE
   */

  sizeList() {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/size/all').subscribe((res: any) => {
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

  getSize(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/size/get/' + id).subscribe((res: any) => {
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

  addSize(size: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://' + constants.URL + ':8100/api/v1/size/insert', size).subscribe((res: any) => {
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

  updateSize(size: any, id: number) {
    return new Promise((resolve, reject) => {
      this.http.post('http://' + constants.URL + ':8100/api/v1/size/update/' + id, size).subscribe((res: any) => {
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

  deleteSize(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/size/delete/' + id).subscribe((res: any) => {
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

  /*******************************************************************
   * PRODUCT BRAND
   */

  productBrandList() {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/productbrand/all').subscribe((res: any) => {
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

  getProductBrand(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/productbrand/get/' + id).subscribe((res: any) => {
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

  addProductBrand(productBrand: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://' + constants.URL + ':8100/api/v1/productbrand/insert', productBrand).subscribe((res: any) => {
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

  updateProductBrand(productBrand: any, id: number) {
    return new Promise((resolve, reject) => {
      this.http.post('http://' + constants.URL + ':8100/api/v1/productbrand/update/' + id, productBrand).subscribe((res: any) => {
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

  deleteProductBrand(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/productbrand/delete/' + id).subscribe((res: any) => {
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

  /*******************************************************************
   * PRODUCT MODEL
   */

  productModelList() {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/productmodel/all').subscribe((res: any) => {
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

  getProductModel(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/productmodel/get/' + id).subscribe((res: any) => {
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

  addProductModel(productModel: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://' + constants.URL + ':8100/api/v1/productmodel/insert', productModel).subscribe((res: any) => {
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

  updateProductModel(productModel: any, id: number) {
    return new Promise((resolve, reject) => {
      this.http.post('http://' + constants.URL + ':8100/api/v1/productmodel/update/' + id, productModel).subscribe((res: any) => {
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

  deleteProductModel(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/productmodel/delete/' + id).subscribe((res: any) => {
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

  /*******************************************************************
   * PRODUCT
   */

  productList() {
    return new Promise((resolve, reject) => {
      this.http.get('http://' + constants.URL + ':8100/api/v1/product/all').subscribe((res: any) => {
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
