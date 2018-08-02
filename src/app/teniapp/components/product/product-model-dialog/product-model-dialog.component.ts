import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProductBrand} from '../../../models/product-brand';
import {ProductModel} from '../../../models/product-model';
import {ProductService} from '../../../services/product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-model-dialog',
  templateUrl: './product-model-dialog.component.html',
  styleUrls: ['./product-model-dialog.component.scss']
})
export class ProductModelDialogComponent implements OnInit {

  //CREATE FORM GROUP
  form : FormGroup;

  title: string;
  click: string = 'guardar';

  productBrandList: ProductBrand[];

  errorBrand: boolean = false;

  constructor(private fb : FormBuilder, public dialogRef: MatDialogRef<ProductModelDialogComponent>, @Inject(MAT_DIALOG_DATA) public productModel: ProductModel,
              public productService: ProductService) {
    this.form = fb.group({
      txt_productModel: ['', Validators.required]
    });

    if (this.productModel.id === 0) this.title = "Insertar Modelo"; else {
      this.title = "Modificar Modelo";
      this.form.get('txt_productModel').setValue(this.productModel.productModelName);
    }
  }

  onNoClick(): void {
    this.click = 'cancelar';
  }

  ngOnInit() {
    this.productService.productBrandList().then((data: any[]) => {
      this.productBrandList = data;
    }, (err) => {
      console.log(err);
    });
  }

  save() {
    if (this.click === 'cancelar') {
      this.dialogRef.close(null);
    } else {
      if (this.productModel.productBrandId === 0) {
        this.errorBrand = true;
      } else {
        this.productModel.productModelName = this.form.get('txt_productModel').value;
        this.dialogRef.close(this.productModel);
      }
    }
  }
}
