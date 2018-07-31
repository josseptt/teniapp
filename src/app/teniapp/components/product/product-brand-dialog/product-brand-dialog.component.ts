import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProductBrand} from '../../../models/product-brand';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-brand-dialog',
  templateUrl: './product-brand-dialog.component.html',
  styleUrls: ['./product-brand-dialog.component.scss']
})
export class ProductBrandDialogComponent implements OnInit {

  //CREATE FORM GROUP
  form : FormGroup;

  title: string;
  click: string = 'guardar';

  constructor(private fb : FormBuilder, public dialogRef: MatDialogRef<ProductBrandDialogComponent>, @Inject(MAT_DIALOG_DATA) public productBrand: ProductBrand) {
    this.form = fb.group({
      txt_productBrand: ['', Validators.required]
    });

    if (this.productBrand.id === 0) this.title = "Insertar Marca"; else {
      this.title = "Modificar Marca";
      this.form.get('txt_productBrand').setValue(this.productBrand.productBrandName);
    }
  }

  onNoClick(): void {
    this.click = 'cancelar';
  }

  ngOnInit() {
  }

  save() {
    if (this.click === 'cancelar') {
      this.dialogRef.close(null);
    } else {
      this.productBrand.productBrandName = this.form.get('txt_productBrand').value;
      this.dialogRef.close(this.productBrand.productBrandName);
    }
  }
}
