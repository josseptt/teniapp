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

  errorModel: boolean = false;
  errorColor: boolean = false;
  errorSize: boolean = false;

  constructor(private fb : FormBuilder, public dialogRef: MatDialogRef<ProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public product: Product,
              public productService: ProductService) {
    this.form = fb.group({
      txt_barCode: '',
      txt_productName: ['', Validators.required],
      txt_description: '',
      txt_urlImage: '',
      txt_purchasePrice: ['', Validators.required],
      txt_salePrice: ['', Validators.required]
    });

    if (this.product.id === 0) this.title = "Insertar Producto"; else {
      this.title = "Modificar Producto";
      this.form.get('txt_barCode').setValue(this.product.barCode);
      this.form.get('txt_productName').setValue(this.product.productName);
      this.form.get('txt_description').setValue(this.product.description);
      this.form.get('txt_urlImage').setValue(this.product.urlImage);
      this.form.get('txt_purchasePrice').setValue(this.product.purchasePrice);
      this.form.get('txt_salePrice').setValue(this.product.salePrice);
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
      if (this.product.productModelId === 0) {
        this.errorModel = true;
      } else if (this.product.colorId === 0) {
        this.errorColor = true;
      } else if (this.product.sizeId === 0) {
        this.errorSize = true;
      } else {
        this.product.barCode = this.form.get('txt_barCode').value;
        this.product.productName = this.form.get('txt_productName').value;
        this.product.description = this.form.get('txt_description').value;
        this.product.urlImage = this.form.get('txt_urlImage').value;
        this.product.purchasePrice = this.form.get('txt_purchasePrice').value;
        this.product.salePrice = this.form.get('txt_salePrice').value;
        this.dialogRef.close(this.product);
      }
    }
  }
}
