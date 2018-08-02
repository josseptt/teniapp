import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProductModel} from '../../../models/product-model';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product';
import {Color} from '../../../models/color';
import {Size} from '../../../models/size';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  //CREATE FORM GROUP
  form : FormGroup;

  title: string;
  click: string = 'guardar';

  colorList: Color[];
  sizeList: Size[];
  productModelList: ProductModel[];

  constructor(private fb : FormBuilder, public dialogRef: MatDialogRef<ProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public product: Product,
              public productService: ProductService) {
    this.form = fb.group({
      txt_barCode: '',
      txt_productName: ['', Validators.required],
      txt_description: '',
      txt_urlImage: ''
    });

    if (this.product.id === 0) this.title = "Insertar Producto"; else {
      this.title = "Modificar Producto";
      this.form.get('txt_barCode').setValue(this.product.barCode);
      this.form.get('txt_productName').setValue(this.product.productName);
      this.form.get('txt_description').setValue(this.product.description);
      this.form.get('txt_urlImage').setValue(this.product.urlImage);
    }
  }

  onNoClick(): void {
    this.click = 'cancelar';
  }

  ngOnInit() {
    this.productService.productModelList().then((data: any[]) => {
      this.productModelList = data;
    }, (err) => {
      console.log(err);
    });

    this.productService.colorList().then((data: any[]) => {
      this.colorList = data;
    }, (err) => {
      console.log(err);
    });

    this.productService.sizeList().then((data: any[]) => {
      this.sizeList = data;
    }, (err) => {
      console.log(err);
    });
  }

  save() {
    if (this.click === 'cancelar') {
      this.dialogRef.close(null);
    } else {
      this.product.barCode = this.form.get('txt_barCode').value;
      this.product.productName = this.form.get('txt_productName').value;
      console.log(this.product.productName);
      this.product.description = this.form.get('txt_description').value;
      this.product.urlImage = this.form.get('txt_urlImage').value;
      this.dialogRef.close(this.product);
    }
  }
}
