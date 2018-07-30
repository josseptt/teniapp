import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TeniappMainComponent } from './teniapp-main.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardSidenavComponent } from './components/dashboard-sidenav/dashboard-sidenav.component';

import { EmployeesService } from './services/employees.service';
import { ProductService } from './services/product.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './security/token.interceptor';
import { ProductComponent } from './components/product/product.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { ColorDialogComponent } from './components/product/color-dialog/color-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from './components/dialogs/info-dialog/info-dialog.component';
import { SizeDialogComponent } from './components/product/size-dialog/size-dialog.component';
import { ProductBrandDialogComponent } from './components/product/product-brand-dialog/product-brand-dialog.component';
import { ProductModelDialogComponent } from './components/product/product-model-dialog/product-model-dialog.component';
import { ProductDialogComponent } from './components/product/product-dialog/product-dialog.component';

const routes: Routes = [
  { path: '', component: DashboardSidenavComponent},
  { path: 'product', component: ProductComponent},
  { path: 'inventory', component: InventoryComponent},
  { path: 'admin', component: AdministrationComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    TeniappMainComponent,
    DashboardComponent,
    DashboardSidenavComponent,
    ProductComponent,
    InventoryComponent,
    AdministrationComponent,
    ColorDialogComponent,
    ConfirmDialogComponent,
    InfoDialogComponent,
    SizeDialogComponent,
    ProductBrandDialogComponent,
    ProductModelDialogComponent,
    ProductDialogComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    EmployeesService,
    ProductService
  ],
  entryComponents: [
    ColorDialogComponent,
    SizeDialogComponent,
    ProductBrandDialogComponent,
    ProductModelDialogComponent,
    ProductComponent,
    ConfirmDialogComponent,
    InfoDialogComponent
  ]
})
export class TeniappModule { }
