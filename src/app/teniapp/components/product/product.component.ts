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
import {ProductBrandDialogComponent} from './product-brand-dialog/product-brand-dialog.component';
import {ProductModelDialogComponent} from './product-model-dialog/product-model-dialog.component';
import {ProductDialogComponent} from './product-dialog/product-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  selected = new FormControl(0);

  idSelected: number = 0;
  idProductSelected: number = 0;

  column: string[][] = [
    ['select', 'id', 'colorName'],
    ['select', 'id', 'sizeName'],
    ['select', 'id', 'productModelName', 'productBrandName'],
    ['select', 'id', 'productBrandName'],
    ['select', 'id', 'productName', 'description', 'productBrand', 'productModel', 'color', 'size', 'purchasePrice', 'salePrice']
  ];

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
      this.dataSourceColor.paginator = this.colorPaginator;
      this.dataSourceColor.sort = this.colorSort;
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
      this.dataSourceProductModel.paginator = this.productModelPaginator;
      this.dataSourceProductModel.sort = this.productModelSort;
    }, (err) => {
      console.log(err);
    });
  }

  getProductBrands() {
    this.productService.productBrandList().then((data: any[]) => {
      this.elementProductBrand = data;
      this.dataSourceProductBrand = new MatTableDataSource<ProductBrand>(this.elementProductBrand);
      this.dataSourceProductBrand.paginator = this.productBrandPaginator;
      this.dataSourceProductBrand.sort = this.productBrandSort;
    }, (err) => {
      console.log(err);
    });
  }

  getProducts() {
    this.productService.productList().then((data: any[]) => {
      console.log(data);
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
        this.updateProductBrand();
        break;
      case 1:
        this.updateProductModel();
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
        if (result !== null) {
          let color = {
            colorName: result
          };

          this.productService.updateColor(color, this.idSelected).then((data: any) => {
            this.getColors();
          }, (err) => {
            this.dialog.open(InfoDialogComponent, {
              width: '450px', data: 'El color: ' + color.colorName + ' ya existe.'
            });
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
        if (result !== null) {
          let size = {
            sizeName: result
          };

          this.productService.updateSize(size, this.idSelected).then((data: any) => {
            this.getSizes();
          }, (err) => {
            this.dialog.open(InfoDialogComponent, {
              width: '450px', data: 'El tamaño: ' + size.sizeName + ' ya existe.'
            });
          });
        }
        this.selectSize.clear();
        this.idSelected = 0;
      });
    }, (err) => {
      console.log(err);
    });
  }

  updateProductBrand(): void {
    this.productService.getProductBrand(this.idSelected).then((data: any) => {
      const dialogRef = this.dialog.open(ProductBrandDialogComponent, {
        width: '450px', data: data
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result !== null) {
          let productBrand = {
            productBrandName: result
          };

          this.productService.updateProductBrand(productBrand, this.idSelected).then((data: any) => {
            this.getProductBrands();
          }, (err) => {
            this.dialog.open(InfoDialogComponent, {
              width: '450px', data: 'La marca: ' + productBrand.productBrandName + ' ya existe.'
            });
          });
        }
        this.selectProductBrand.clear();
        this.idSelected = 0;
      });
    }, (err) => {
      console.log(err);
    });
  }

  updateProductModel(): void {
    this.productService.getProductModel(this.idSelected).then((data: any) => {
      let productModel = data;

      this.productService.productBrandList().then((data: any[]) => {
        data.forEach((element) => {
          if (element.productBrandName === productModel.productBrandName) {

            /*SHOW DIALOG*/
            const dialogRef = this.dialog.open(ProductModelDialogComponent, {
              width: '450px', data: {
                id: productModel.id,
                productModelName: productModel.productModelName,
                productBrandId: element.id,
                active: productModel.active
              }
            });

            dialogRef.afterClosed().subscribe(result => {
              if (result !== null) {
                let productBrand = {
                  id: result.productBrandId
                };

                let productModel = {
                  productModelName: result.productModelName,
                  productBrand: productBrand
                };

                this.productService.updateProductModel(productModel, this.idSelected).then((data: any) => {
                  this.getProductModels();
                }, (err) => {
                  this.dialog.open(InfoDialogComponent, {
                    width: '450px', data: 'El modelo: ' + productModel.productModelName + ' ya existe.'
                  });
                });
              }
              this.selectProductModel.clear();
              this.idSelected = 0;
            });
            return;
          }
        });
      });
    }, (err) => {
      console.log(err);
    });
  }

  updateProduct(): void {
    this.productService.getProduct(this.idProductSelected).then((data: any) => {
      let product = data;

      this.productService.productModelList().then((data: any[]) => {
        //SEARCH MODEL
        data.forEach((model) => {
          if (model.productModelName === product.productModel) {

            //SEARCH COLOR
            this.productService.colorList().then((data: any[]) => {
              data.forEach((color) => {
                if (color.colorName === product.color) {

                  //SEARCH SIZE
                  this.productService.sizeList().then((data: any[]) => {
                    data.forEach((size) => {
                      if (size.sizeName === product.size) {

                        /*SHOW DIALOG*/
                        const dialogRef = this.dialog.open(ProductDialogComponent, {
                          width: '450px', data: {
                            id: product.id,
                            productName: product.productName,
                            barCode: product.barCode,
                            description: product.description,
                            urlImage: product.urlImage,
                            productModelId: model.id,
                            colorId: color.id,
                            sizeId: size.id,
                            purchasePrice: product.purchasePrice,
                            salePrice: product.salePrice,
                            active: product.active
                          }
                        });

                        dialogRef.afterClosed().subscribe(result => {
                          if (result !== null) {
                            let product = {
                              barCode: result.barCode,
                              productName: result.productName,
                              description: result.description,
                              urlImage: result.urlImage,
                              productModel: {
                                id: result.productModelId
                              },
                              color: {
                                id: result.colorId
                              },
                              size: {
                                id: result.sizeId
                              }
                            };

                            this.productService.updateProduct(product, this.idProductSelected).then((data: any) => {
                              let productPrice = {
                                product: {
                                  id: data.id
                                },
                                purchasePrice: result.purchasePrice,
                                salePrice: result.salePrice
                              };

                              this.productService.addProductPrice(productPrice).then((data: any) => {
                                this.getProducts();
                              }, (err) => {
                                console.log(err);
                              });
                            }, (err) => {
                              this.dialog.open(InfoDialogComponent, {
                                width: '450px', data: 'El producto: ' + product.productName + ' ya existe.'
                              });
                            });
                          }
                          this.selectProduct.clear();
                          this.idProductSelected = 0;
                        });
                        return;
                      }
                    });
                  });
                  return;
                }
              });
            });
            return;
          }
        });
      });
    }, (err) => {
      console.log(err);
    });
  }

  delete() {
    switch (this.selected.value) {
      case 0:
        this.deleteProductBrand();
        break;
      case 1:
        this.deleteProductModel();
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
              });
              this.getColors();
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
              });
              this.getSizes();
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

  deleteProductBrand(): void {
    this.productService.getProductBrand(this.idSelected).then((data: any) => {
      let productBrand = data;

      if (productBrand.active) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '450px', data: "Esta seguro que desea eliminar esta marca: " + productBrand.productBrandName +"?"
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          if (result) {
            this.productService.deleteProductBrand(this.idSelected).then((data: any) => {
              this.dialog.open(InfoDialogComponent, {
                width: '450px', data: "Marca Eliminada con Exito!"
              });
              this.getProductBrands();
            }, (err) => {
              console.log(err);
            });
          }
          this.selectProductBrand.clear();
          this.idSelected = 0;
        });
      }
    }, (err) => {
      console.log(err);
    });
  }

  deleteProductModel(): void {
    this.productService.getProductModel(this.idSelected).then((data: any) => {
      let productModel = data;

      if (productModel.active) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '450px', data: "Esta seguro que desea eliminar este modelo: " + productModel.productModelName +"?"
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          if (result) {
            this.productService.deleteProductModel(this.idSelected).then((data: any) => {
              this.dialog.open(InfoDialogComponent, {
                width: '450px', data: "Modelo Eliminado con Exito!"
              });
              this.getProductModels();
            }, (err) => {
              console.log(err);
            });
          }
          this.selectProductModel.clear();
          this.idSelected = 0;
        });
      }
    }, (err) => {
      console.log(err);
    });
  }

  deleteProduct(): void {
    this.productService.getProduct(this.idProductSelected).then((data: any) => {
      let product = data;

      if (product.active) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '450px', data: "Esta seguro que desea eliminar este producto: " + product.productName +"?"
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          if (result) {
            this.productService.deleteProduct(this.idProductSelected).then((data: any) => {
              this.dialog.open(InfoDialogComponent, {
                width: '450px', data: "producto Eliminado con Exito!"
              });
              this.getProducts();
            }, (err) => {
              console.log(err);
            });
          }
          this.selectProduct.clear();
          this.idProductSelected = 0;
        });
      }
    }, (err) => {
      console.log(err);
    });
  }

  insert() {
    switch (this.selected.value) {
      case 0:
        this.insertProductBrand();
        break;
      case 1:
        this.insertProductModel();
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
        colorName: '',
        active: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null) {
        let color = {
          colorName: result
        };

        this.productService.addColor(color).then((data: any) => {
          this.getColors();
        }, (err) => {
          this.dialog.open(InfoDialogComponent, {
            width: '450px', data: 'El color: ' + color.colorName + ' ya existe.'
          });
        });
      }
    });
  }

  insertSize(): void {
    const dialogRef = this.dialog.open(SizeDialogComponent, {
      width: '450px', data: {
        id: 0,
        sizeName: '',
        active: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null) {
        let size = {
          sizeName: result
        };

        this.productService.addSize(size).then((data: any) => {
          this.getSizes();
        }, (err) => {
          this.dialog.open(InfoDialogComponent, {
            width: '450px', data: 'El tamaño: ' + size.sizeName + ' ya existe.'
          });
        });
      }
    });
  }

  insertProductBrand(): void {
    const dialogRef = this.dialog.open(ProductBrandDialogComponent, {
      width: '450px', data: {
        id: 0,
        productBrandName: '',
        active: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null) {
        let productBrand = {
          productBrandName: result
        };

        this.productService.addProductBrand(productBrand).then((data: any) => {
          this.getProductBrands();
        }, (err) => {
          this.dialog.open(InfoDialogComponent, {
            width: '450px', data: 'La marca: ' + productBrand.productBrandName + ' ya existe.'
          });
        });
      }
    });
  }

  insertProductModel(): void {
    const dialogRef = this.dialog.open(ProductModelDialogComponent, {
      width: '450px', data: {
        id: 0,
        productModelName: '',
        productBrandId: 0,
        active: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null) {
        let productModel = {
          productModelName: result.productModelName,
          productBrand: {
            id: result.productBrandId
          }
        };

        this.productService.addProductModel(productModel).then((data: any) => {
          this.getProductModels();
        }, (err) => {
          this.dialog.open(InfoDialogComponent, {
            width: '450px', data: 'El modelo: ' + productModel.productModelName + ' ya existe.'
          });
        });
      }
    });
  }

  insertProduct(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '450px', data: {
        id: '',
        barCode: '',
        productName: '',
        description: '',
        urlImage: '',
        colorId: 0,
        sizeId: 0,
        productModelId: 0,
        purchasePrice: 0,
        salePrice: 0,
        active: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result !== null) {
        let product = {
          barCode: result.barCode,
          productName: result.productName,
          description: result.description,
          urlImage: result.urlImage,
          productModel: {
            id: result.productModelId
          },
          color: {
            id: result.colorId
          },
          size: {
            id: result.sizeId
          }
        };

        this.productService.addProduct(product).then((data: any) => {
          let productPrice = {
            product: {
              id: data.id
            },
            purchasePrice: result.purchasePrice,
            salePrice: result.salePrice
          };

          this.productService.addProductPrice(productPrice).then((data: any) => {
            this.getProducts();
          }, (err) => {
            console.log(err);
          });
        }, (err) => {
          this.dialog.open(InfoDialogComponent, {
            width: '450px', data: 'El producto: ' + product.productName + ' ya existe.'
          });
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
          this.setProductBrandPaginator();
          break;
        case 1:
          this.setProductModelPaginator();
          break;
        case 2:
          this.setSizePaginator();
          break;
        case 3:
          this.setColorPaginator();
          break;
      }
    });
  }

  setColorPaginator() {
    !this.dataSourceColor.paginator ? this.dataSourceColor.paginator = this.colorPaginator : null;
    !this.dataSourceColor.sort ? this.dataSourceColor.sort = this.colorSort : null;
  }

  setSizePaginator() {
    !this.dataSourceSize.paginator ? this.dataSourceSize.paginator = this.sizePaginator : null;
    !this.dataSourceSize.sort ? this.dataSourceSize.sort = this.sizeSort : null;
  }

  setProductModelPaginator() {
    !this.dataSourceProductModel.paginator ? this.dataSourceProductModel.paginator = this.productModelPaginator : null;
    !this.dataSourceProductModel.sort ? this.dataSourceProductModel.sort = this.productModelSort : null;
  }

  setProductBrandPaginator() {
    !this.dataSourceProductBrand.paginator ? this.dataSourceProductBrand.paginator = this.productBrandPaginator : null;
    !this.dataSourceProductBrand.sort ? this.dataSourceProductBrand.sort = this.productBrandSort : null;
  }
}
