import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Inventory} from '../../models/inventory';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  selected = new FormControl(0);

  idSelected: number = 0;

  column: string[] = ['id', 'productName', 'description',
    'color', 'size', 'productModel', 'productBrand',
    'stock', 'availability', 'minimumStock'];

  elementInventory: Inventory[];

  dataSourceInventory: any;

  selectInventory = new SelectionModel<Inventory>(true, []);

  @ViewChild('inventorySort') inventorySort: MatSort;
  @ViewChild('inventoryPaginator') inventoryPaginator: MatPaginator;

  constructor(public productService: ProductService) { }

  ngOnInit() {
    this.getInventory();
  }

  getInventory() {
    this.productService.inventoryList().then((data: any[]) => {
      this.elementInventory = data;
      this.dataSourceInventory = new MatTableDataSource<Inventory>(this.elementInventory);
      this.dataSourceInventory.paginator = this.inventoryPaginator;
      this.dataSourceInventory.sort = this.inventorySort;
    });
  }

  search(filterValue: string) {
    this.dataSourceInventory.filter = filterValue.trim().toLowerCase();
  }
}
