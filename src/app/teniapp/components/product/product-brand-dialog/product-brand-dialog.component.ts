import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProductBrand} from '../../../models/product-brand';

@Component({
  selector: 'app-product-brand-dialog',
  templateUrl: './product-brand-dialog.component.html',
  styleUrls: ['./product-brand-dialog.component.scss']
})
export class ProductBrandDialogComponent implements OnInit {

  title: string;

  constructor(public dialogRef: MatDialogRef<ProductBrandDialogComponent>, @Inject(MAT_DIALOG_DATA) public productBrand: ProductBrand) {
    if (this.productBrand.id === 0) this.title = "Insertar Marca"; else this.title = "Modificar Marca";
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
