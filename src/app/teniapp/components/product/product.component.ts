import {Component, OnInit, ViewChild} from '@angular/core';
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
import {FormControl} from '@angular/forms';
import {SizeDialogComponent} from './size-dialog/size-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  selected = new FormControl(0);

  idSelected: number = 0;
  idProductSelected: number = 0;

  columnColor: string[] = ['select', 'id', 'colorName'];
  columnSize: string[] = ['select', 'id', 'sizeName'];
  columnProductModel: string[] = ['select', 'id', 'productModelName', 'productBrandName'];
  columnProductBrand: string[] = ['select', 'id', 'productBrandName'];
  columnProduct: string[] = ['id', 'productName', 'productBrandName', 'productModelName', 'colorName', 'sizeName'];

  elementColor: Color[];
  elementSize: Size[];
  elementProductModel: ProductModel[];
  elementProductBrand: ProductBrand[];
  elementProduct: Product[];

  dataSourceColor: any;
  dataSourceSize: any;
  dataSourceProductModel: any;
  dataSourceProductBrand: any;
  dataSourceProduct: any;

  selectColor = new SelectionModel<Color>(true, []);
  selectSize = new SelectionModel<Size>(true, []);
  selectProductModel = new SelectionModel<ProductModel>(true, []);
  selectProductBrand = new SelectionModel<ProductBrand>(true, []);
  selectProduct = new SelectionModel<Product>(true, []);

  @ViewChild('colorSort') colorSort: MatSort;
  @ViewChild('colorPaginator') colorPaginator: MatPaginator;

  @ViewChild('sizeSort') sizeSort: MatSort;
  @ViewChild('sizePaginator') sizePaginator: MatPaginator;

  @ViewChild('productModelSort') productModelSort: MatSort;
  @ViewChild('productModelPaginator') productModelPaginator: MatPaginator;

  @ViewChild('productBrandSort') productBrandSort: MatSort;
  @ViewChild('productBrandPaginator') productBrandPaginator: MatPaginator;

  @ViewChild('productSort') productSort: MatSort;
  @ViewChild('productPaginator') productPaginator: MatPaginator;

  constructor(public productService: ProductService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getColors();
    this.getSizes();
    this.getProductModels();
    this.getProductBrands();
    this.getProducts();
  }

  getColors() {
    this.productService.colorList().then((data: any[]) => {
      this.elementColor = data;
      this.dataSourceColor = new MatTableDataSource<Color>(this.elementColor);
    }, (err) => {
      console.log(err);
    });
  }

  getSizes() {
    this.productService.sizeList().then((data: any[]) => {
      this.elementSize = data;
      this.dataSourceSize = new MatTableDataSource<Size>(this.elementSize);
      this.dataSourceSize.paginator = this.sizePaginator;
      this.dataSourceSize.sort = this.sizeSort;
    }, (err) => {
      console.log(err);
    });
  }

  getProductModels() {
    this.productService.productModelList().then((data: any[]) => {
      this.elementProductModel = data;
      this.dataSourceProductModel = new MatTableDataSource<ProductModel>(this.elementProductModel);
    }, (err) => {
      console.log(err);
    });
  }

  getProductBrands() {
    this.productService.productBrandList().then((data: any[]) => {
      this.elementProductBrand = data;
      this.dataSourceProductBrand = new MatTableDataSource<ProductBrand>(this.elementProductBrand);
    }, (err) => {
      console.log(err);
    });
  }

  getProducts() {
    this.productService.productList().then((data: any[]) => {
      this.elementProduct = data;
      this.dataSourceProduct = new MatTableDataSource<Product>(this.elementProduct);
      this.dataSourceProduct.paginator = this.productPaginator;
      this.dataSourceProduct.sort = this.productSort;
    }, (err) => {
      console.log(err);
    });
  }

  /**
   * INSERT, UPDATE AND DELETE
   */

  update() {
    switch (this.selected.value) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        this.updateSize();
        break;
      case 3:
        this.updateColor();
        break;
    }
  }

  updateColor(): void {
    this.productService.getColor(this.idSelected).then((data: any) => {
      const dialogRef = this.dialog.open(ColorDialogComponent, {
        width: '450px', data: data
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          let color = {
            colorName: result
          };

          this.productService.updateColor(color, this.idSelected).then((data: any) => {
            this.getColors();
          }, (err) => {
            console.log(err);
          });
        }
        this.selectColor.clear();
        this.idSelected = 0;
      });
    }, (err) => {
      console.log(err);
    });
  }

  updateSize(): void {
    this.productService.getSize(this.idSelected).then((data: any) => {
      const dialogRef = this.dialog.open(SizeDialogComponent, {
        width: '450px', data: data
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          let size = {
            sizeName: result
          };

          this.productService.updateSize(size, this.idSelected).then((data: any) => {
            this.getSizes();
          }, (err) => {
            console.log(err);
          });
        }
        this.selectSize.clear();
        this.idSelected = 0;
      });
    }, (err) => {
      console.log(err);
    });
  }

  delete() {
    switch (this.selected.value) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        this.deleteSize();
        break;
      case 3:
        this.deleteColor();
        break;
    }
  }

  deleteColor(): void {
    this.productService.getColor(this.idSelected).then((data: any) => {
      let color = data;

      if (color.active) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '450px', data: "Esta seguro que desea eliminar este color: " + color.colorName +"?"
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          if (result) {
            this.productService.deleteColor(this.idSelected).then((data: any) => {
              this.dialog.open(InfoDialogComponent, {
                width: '450px', data: "Color Eliminado con Exito!"
              })
            }, (err) => {
              console.log(err);
            });
          }
          this.selectColor.clear();
          this.idSelected = 0;
        });
      }
    }, (err) => {
      console.log(err);
    });
  }

  deleteSize(): void {
    this.productService.getSize(this.idSelected).then((data: any) => {
      let size = data;

      if (size.active) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '450px', data: "Esta seguro que desea eliminar este tamaño: " + size.sizeName +"?"
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          if (result) {
            this.productService.deleteSize(this.idSelected).then((data: any) => {
              this.dialog.open(InfoDialogComponent, {
                width: '450px', data: "Tamaño Eliminado con Exito!"
              })
            }, (err) => {
              console.log(err);
            });
          }
          this.selectSize.clear();
          this.idSelected = 0;
        });
      }
    }, (err) => {
      console.log(err);
    });
  }

  insert() {
    switch (this.selected.value) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        this.insertSize();
        break;
      case 3:
        this.insertColor();
        break;
    }
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

  insertSize(): void {
    const dialogRef = this.dialog.open(SizeDialogComponent, {
      width: '450px', data: {
        id: 0,
        sizeName : '',
        active: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let size = {
          sizeName: result
        };

        this.productService.addSize(size).then((data: any) => {
          this.getSizes();
        }, (err) => {
          console.log(err);
        });
      }
    });
  }

  /**
   * SEARCH A ELEMENT IN A TABLE
   * @param filterValue
   */

  search(filterValue: string) {
    switch (this.selected.value) {
      case 0:
        this.searchProductBrand(filterValue);
        break;
      case 1:
        this.searchProductModel(filterValue);
        break;
      case 2:
        this.searchSize(filterValue);
        break;
      case 3:
        this.searchColor(filterValue);
        break;
    }
  }

  searchColor(filterValue: string) {
    this.dataSourceColor.filter = filterValue.trim().toLowerCase();
  }

  searchSize(filterValue: string) {
    this.dataSourceSize.filter = filterValue.trim().toLowerCase();
  }

  searchProductModel(filterValue: string) {
    this.dataSourceProductModel.filter = filterValue.trim().toLowerCase();
  }

  searchProductBrand(filterValue: string) {
    this.dataSourceProductBrand.filter = filterValue.trim().toLowerCase();
  }

  searchProduct(filterValue: string) {
    this.dataSourceProduct.filter = filterValue.trim().toLowerCase();
  }

  /**
   * SELECT A ROW
   * @param row
   */

  selectedColor(row) {
    if (this.selectColor.selected.length > 0) {
      this.selectColor.clear();

      if (this.idSelected !== row.id) {
        this.selectColor.toggle(row);
        this.idSelected = row.id;
      } else {
        this.idSelected = 0;
      }
    } else {
      this.selectColor.toggle(row);
      this.idSelected = row.id;
    }
  }

  selectedSize(row) {
    if (this.selectSize.selected.length > 0) {
      this.selectSize.clear();

      if (this.idSelected !== row.id) {
        this.selectSize.toggle(row);
        this.idSelected = row.id;
      } else {
        this.idSelected = 0;
      }
    } else {
      this.selectSize.toggle(row);
      this.idSelected = row.id;
    }
  }

  selectedProductModel(row) {
    if (this.selectProductModel.selected.length > 0) {
      this.selectProductModel.clear();

      if (this.idSelected !== row.id) {
        this.selectProductModel.toggle(row);
        this.idSelected = row.id;
      } else {
        this.idSelected = 0;
      }
    } else {
      this.selectProductModel.toggle(row);
      this.idSelected = row.id;
    }
  }

  selectedProductBrand(row) {
    if (this.selectProductBrand.selected.length > 0) {
      this.selectProductBrand.clear();

      if (this.idSelected !== row.id) {
        this.selectProductBrand.toggle(row);
        this.idSelected = row.id;
      } else {
        this.idSelected = 0;
      }
    } else {
      this.selectProductBrand.toggle(row);
      this.idSelected = row.id;
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

  /**
   * 0: Product Brands
   * 1: Product Models
   * 2: Sizes
   * 3: Color
   * @param event: EXECUTE THE EVENT THAT DETERMINES WHAT INDEX BELONGS TO THE SELECTED TAB
   */
  changeTab(event) {
    this.selected.setValue(event);
    this.idSelected = 0;
    this.selectProductModel.clear();
    this.selectProductBrand.clear();
    this.selectSize.clear();
    this.selectColor.clear();

    setTimeout(() => {
      switch (this.selected.value) {
        case 0:
          !this.dataSourceProductBrand.paginator ? this.dataSourceProductBrand.paginator = this.productBrandPaginator : null;
          !this.dataSourceProductBrand.sort ? this.dataSourceProductBrand.sort = this.productBrandSort : null;
          break;
        case 1:
          !this.dataSourceProductModel.paginator ? this.dataSourceProductModel.paginator = this.productModelPaginator : null;
          !this.dataSourceProductModel.sort ? this.dataSourceProductModel.sort = this.productModelSort : null;
          break;
        case 2:
          !this.dataSourceSize.paginator ? this.dataSourceSize.paginator = this.sizePaginator : null;
          !this.dataSourceSize.sort ? this.dataSourceSize.sort = this.sizeSort : null;
          break;
        case 3:
          !this.dataSourceColor.paginator ? this.dataSourceColor.paginator = this.colorPaginator : null;
          !this.dataSourceColor.sort ? this.dataSourceColor.sort = this.colorSort : null;
          break;
      }
    });
  }
}
