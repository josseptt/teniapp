import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ProductService} from '../../services/product.service';
import {Color} from '../../models/color';
import {Size} from '../../models/size';
import {ProductModel} from '../../models/product-model';
import {ProductBrand} from '../../models/product-brand';
import {Product} from '../../models/product';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog} from '@angular/material';
import {ColorDialogComponent} from './color-dialog/color-dialog.component';
import {ConfirmDialogComponent} from '../dialogs/confirm-dialog/confirm-dialog.component';
import {InfoDialogComponent} from '../dialogs/info-dialog/info-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  idColorSelected: number = 0;
  idProductSelected: number = 0;

  columnColor: string[] = ['select', 'id', 'colorName'];
  //columnSize: string[] = ['id', 'sizeName'];
  //columnProductModel: string[] = ['id', 'productModelName', 'productBrandName'];
  //columnProductBrand: string[] = ['id', 'productBrandName'];
  columnProduct: string[] = ['id', 'productName', 'productBrandName', 'productModelName', 'colorName', 'sizeName'];

  elementColor: Color[];
  //elementSize: Size[];
  //elementProductModel: ProductModel[];
  //elementProductBrand: ProductBrand[];
  elementProduct: Product[];

  dataSourceColor: any;
  //dataSourceSize: any;
  //dataSourceProductModel: any;
  //dataSourceProductBrand: any;
  dataSourceProduct: any;

  selectColor = new SelectionModel<Color>(true, []);
  selectProduct = new SelectionModel<Product>(true, []);

  @ViewChild(MatSort) colorSort: MatSort;
  @ViewChild(MatPaginator) colorPaginator: MatPaginator;

  @ViewChild(MatSort) productSort: MatSort;
  @ViewChild(MatPaginator) productPaginator: MatPaginator;

  constructor(public productService: ProductService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getColors();
    //this.getSizes();
    //this.getProductModels();
    //this.getProductBrands();
    this.getProducts();
  }

  getColors() {
    this.productService.colorList().then((data: any[]) => {
      this.elementColor = data;
      this.dataSourceColor = new MatTableDataSource<Color>(this.elementColor);
      this.dataSourceColor.paginator = this.colorPaginator;
      this.dataSourceColor.sort = this.colorSort;
    }, (err) => {
      console.log(err);
    });
  }

  updateColor(): void {
    this.productService.getColor(this.idColorSelected).then((data: any) => {
      const dialogRef = this.dialog.open(ColorDialogComponent, {
        width: '450px', data: data
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          let color = {
            colorName: result
          };

          this.productService.updateColor(color, this.idColorSelected).then((data: any) => {
            this.getColors();
          }, (err) => {
            console.log(err);
          });
        }
        this.selectColor.clear();
        this.idColorSelected = 0;
      });
    }, (err) => {
      console.log(err);
    });
  }

  deleteColor(): void {
    this.productService.getColor(this.idColorSelected).then((data: any) => {
      let color = data;

      if (color.active) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '450px', data: "Esta seguro que desea eliminar este color: " + color.colorName +"?"
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          if (result) {
            this.productService.deleteColor(this.idColorSelected).then((data: any) => {
              this.dialog.open(InfoDialogComponent, {
                width: '450px', data: "Color Eliminado con Exito!"
              })
            }, (err) => {
              console.log(err);
            });
          }
          this.selectColor.clear();
          this.idColorSelected = 0;
        });
      }
    }, (err) => {
      console.log(err);
    });
  }

  insertColor(): void {
    const dialogRef = this.dialog.open(ColorDialogComponent, {
      width: '450px', data: {
        id: 0,
        colorName : '',
        active: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let color = {
          colorName: result
        };

        this.productService.addColor(color).then((data: any) => {
          this.getColors();
        }, (err) => {
          console.log(err);
        });
      }
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
*/
  getProducts() {
    this.productService.productList().then((data: any[]) => {
      this.elementProduct = data;
      this.dataSourceProduct = new MatTableDataSource<Product>(this.elementProduct);
      this.dataSourceProduct.paginator = this.productPaginator;
      this.dataSourceColor.sort = this.colorSort;
    }, (err) => {
      console.log(err);
    });
  }

  searchColor(filterValue: string) {
    this.dataSourceColor.filter = filterValue.trim().toLowerCase();
  }

  searchProduct(filterValue: string) {
    this.dataSourceProduct.filter = filterValue.trim().toLowerCase();
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

  selectedProduct(row) {
    if (this.selectProduct.selected.length > 0) {
      this.selectProduct.clear();

      if (this.idProductSelected !== row.id) {
        this.selectProduct.toggle(row);
        this.idProductSelected = row.id;
      } else {
        this.idProductSelected = 0;
      }
    } else {
      this.selectProduct.toggle(row);
      this.idProductSelected = row.id;
    }
  }
}
