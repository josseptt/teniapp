import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ProductService} from '../../services/product.service';
import {Color} from '../../models/color';
import {Size} from '../../models/size';
import {ProductModel} from '../../models/product-model';
import {ProductBrand} from '../../models/product-brand';
import {Product} from '../../models/product';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  idColorSelected: number = 0;

  columnColor: string[] = ['select', 'id', 'colorName'];
  //columnSize: string[] = ['id', 'sizeName'];
  //columnProductModel: string[] = ['id', 'productModelName', 'productBrandName'];
  //columnProductBrand: string[] = ['id', 'productBrandName'];
  //columnsProduct: string[] = ['id', 'productName', 'productBrandName', 'productModelName', 'colorName', 'sizeName'];

  elementColor: Color[];
  //elementSize: Size[];
  //elementProductModel: ProductModel[];
  //elementProductBrand: ProductBrand[];
  //elementProduct: Product[];

  dataSourceColor: any;
  //dataSourceSize: any;
  //dataSourceProductModel: any;
  //dataSourceProductBrand: any;
  //dataSourceProduct: any;

  selectColor = new SelectionModel<Color>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public productService: ProductService) {}

  ngOnInit() {
    this.getColors();
    //this.getSizes();
    //this.getProductModels();
    //this.getProductBrands();
    //this.getProducts();
  }

  getColors() {
    this.productService.colorList().then((data: any[]) => {
      this.elementColor = data;
      this.dataSourceColor = new MatTableDataSource<Color>(this.elementColor);
      this.dataSourceColor.paginator = this.paginator;
      this.dataSourceColor.sort = this.sort;
    }, (err) => {
      console.log(err);
    });
  }

  /*
  getSizes() {
    this.productService.sizeList().then((data: any[]) => {
      this.elementSize = data;
      this.dataSourceSize = new MatTableDataSource<Size>(this.elementSize);
      //this.dataSourceSize.paginator = this.paginator;
    }, (err) => {
      console.log(err);
    });
  }

  getProductModels() {
    this.productService.productModelList().then((data: any[]) => {
      this.elementProductModel = data;
      this.dataSourceProductModel = new MatTableDataSource<ProductModel>(this.elementProductModel);
      //this.dataSourceProductModel.paginator = this.paginator;
    }, (err) => {
      console.log(err);
    });
  }

  getProductBrands() {
    this.productService.productBrandList().then((data: any[]) => {
      this.elementProductBrand = data;
      this.dataSourceProductBrand = new MatTableDataSource<ProductBrand>(this.elementProductBrand);
      //this.dataSourceProductBrand.paginator = this.paginator;
    }, (err) => {
      console.log(err);
    });
  }

  getProducts() {
    this.productService.productList().then((data: any[]) => {
      this.elementProduct = data;
      this.dataSourceProduct = new MatTableDataSource<Product>(this.elementProduct);
      //this.dataSourceProduct.paginator = this.paginator;
    }, (err) => {
      console.log(err);
    });
  }
  */

  searchColor(filterValue: string) {
    this.dataSourceColor.filter = filterValue.trim().toLowerCase();
  }

  selectedColor(row) {
    if (this.selectColor.selected.length > 0) {
      this.selectColor.clear();

      if (this.idColorSelected !== row.id) {
        this.selectColor.toggle(row);
        this.idColorSelected = row.id;
      } else {
        this.idColorSelected = 0;
      }
    } else {
      this.selectColor.toggle(row);
      this.idColorSelected = row.id;
    }
  }
}
