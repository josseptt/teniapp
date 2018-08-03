import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SupplierService} from '../../services/supplier.service';
import {Supplier} from '../../models/supplier';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {SelectionModel} from '@angular/cdk/collections';
import {PurchaseDetail} from '../../models/purchase-detail';
import {MatPaginator, MatSort} from '@angular/material';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  txtSupplier = new FormControl();
  txtProduct = new FormControl();
  txtQuantity = new FormControl();
  txtPrice = new FormControl();

  idSelected: number = 0;

  column: string[] = ['select', 'id', 'productName', 'productBrand', 'productModel', 'color', 'size', 'purchasePrice', 'requestedQuantity', 'receivedQuantity', 'subtotal'];

  dataSource: any;

  selectRow = new SelectionModel<PurchaseDetail>(true, []);

  supplierList: Supplier[];
  productList: Product[];

  @ViewChild('sort') sort: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(public supplierService: SupplierService, public productService: ProductService) { }

  ngOnInit() {
    this.supplierService.supplierList().then((data: any[]) => {
      this.supplierList = data;
    });

    this.productService.productList().then((data: any[]) => {
      this.productList = data;
    });
  }

  selected(row) {
    if (this.selectRow.selected.length > 0) {
      this.selectRow.clear();

      if (this.idSelected !== row.id) {
        this.selectRow.toggle(row);
        this.idSelected = row.id;
      } else {
        this.idSelected = 0;
      }
    } else {
      this.selectRow.toggle(row);
      this.idSelected = row.id;
    }
  }
}
