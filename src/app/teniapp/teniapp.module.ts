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
import { PurchaseComponent } from './components/purchase/purchase.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { SalesComponent } from './components/sales/sales.component';
import { RoleDialogComponent } from './components/administration/role-dialog/role-dialog.component';
import { PermissionDialogComponent } from './components/administration/permission-dialog/permission-dialog.component';
import { UserPageComponent } from './components/administration/user-page/user-page.component';
import { UserDialogComponent } from './components/administration/user-dialog/user-dialog.component';

const routes: Routes = [
  { path: '', component: DashboardSidenavComponent},
  { path: 'product', component: ProductComponent},
  { path: 'inventory', component: InventoryComponent},
  { path: 'admin', component: AdministrationComponent},
  { path: 'edit', component: EditProfileComponent},
  { path: 'purchase', component: PurchaseComponent},
  { path: 'sales', component: SalesComponent},
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
    ProductDialogComponent,
    PurchaseComponent,
    EditProfileComponent,
    SalesComponent,
    RoleDialogComponent,
    PermissionDialogComponent,
    UserPageComponent,
    UserDialogComponent
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
    ProductDialogComponent,
    RoleDialogComponent,
    PermissionDialogComponent,
    UserDialogComponent,
    ConfirmDialogComponent,
    InfoDialogComponent
  ]
})
export class TeniappModule { }
