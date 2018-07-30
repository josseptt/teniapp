import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProductBrand} from '../../../models/product-brand';
import {ProductModel} from '../../../models/product-model';
import {ProductService} from '../../../services/product.service';
import {logging} from 'selenium-webdriver';

@Component({
  selector: 'app-product-model-dialog',
  templateUrl: './product-model-dialog.component.html',
  styleUrls: ['./product-model-dialog.component.scss']
})
export class ProductModelDialogComponent implements OnInit {

  title: string;

  productBrandList: ProductBrand[];

  constructor(public dialogRef: MatDialogRef<ProductModelDialogComponent>, @Inject(MAT_DIALOG_DATA) public productModel: ProductModel, public product: ProductService) {
    console.log(productModel);
    if (this.productModel.id === 0) this.title = "Insertar Modelo"; else this.title = "Modificar Modelo";
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.product.productBrandList().then((data: any[]) => {
      this.productBrandList = data;
    }, (err) => {
      console.log(err);
    });
  }
}
