import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Role} from '../../models/role';
import {Permission} from '../../models/permission';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {RoleService} from '../../services/role.service';
import {ConfirmDialogComponent} from '../dialogs/confirm-dialog/confirm-dialog.component';
import {InfoDialogComponent} from '../dialogs/info-dialog/info-dialog.component';
import {RoleDialogComponent} from './role-dialog/role-dialog.component';
import {PermissionDialogComponent} from './permission-dialog/permission-dialog.component';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  selectTab = new FormControl(0);

  idSelected: number = 0;

  column: string[][] = [
    ['select', 'id', 'roleName', 'description'],
    ['select', 'id', 'permissionName', 'roleName']
  ];

  elementRole: Role[];
  elementPermission: Permission[];

  dataSourceRole: any;
  dataSourcePermission: any;

  selectRole = new SelectionModel<Role>(true, []);
  selectPermission = new SelectionModel<Permission>(true, []);

  @ViewChild('roleSort') roleSort: MatSort;
  @ViewChild('rolePaginator') rolePaginator: MatPaginator;

  @ViewChild('permissionSort') permissionSort: MatSort;
  @ViewChild('permissionPaginator') permissionPaginator: MatPaginator;

  constructor(public roleService: RoleService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getRoles();
    this.getPermissions();
  }

  getRoles() {
    this.roleService.roleList().then((data: any[]) => {
      this.elementRole = data;
      this.dataSourceRole = new MatTableDataSource<Role>(this.elementRole);
      this.dataSourceRole.paginator = this.rolePaginator;
      this.dataSourceRole.sort = this.roleSort;
    });
  }

  getPermissions() {
    this.roleService.rolePermissionList().then((data: any[]) => {
      this.elementPermission = data;
      this.dataSourcePermission = new MatTableDataSource<Permission>(this.elementPermission);
      this.dataSourcePermission.paginator = this.permissionPaginator;
      this.dataSourcePermission.sort = this.permissionSort;
    });
  }

  /**
   * SEARCH
   */

  search(filterValue: string) {
    switch (this.selectTab.value) {
      case 0:
        this.dataSourceRole.filter = filterValue.trim().toLowerCase();
        break;
      case 1:
        this.dataSourcePermission.filter = filterValue.trim().toLowerCase();
        break;
    }
  }

  /**
   * SELECT A ROW
   */

  selectedRoleRow(row) {
    if (this.selectRole.selected.length > 0) {
      this.selectRole.clear();

      if (this.idSelected !== row.id) {
        this.selectRole.toggle(row);
        this.idSelected = row.id;
      } else {
        this.idSelected = 0;
      }
    } else {
      this.selectRole.toggle(row);
      this.idSelected = row.id;
    }
  }

  selectedPermissionRow(row) {
    if (this.selectPermission.selected.length > 0) {
      this.selectPermission.clear();

      if (this.idSelected !== row.id) {
        this.selectPermission.toggle(row);
        this.idSelected = row.id;
      } else {
        this.idSelected = 0;
      }
    } else {
      this.selectPermission.toggle(row);
      this.idSelected = row.id;
    }
  }

  /**
   * CHANGE TAB
   */

  changeTab(event) {
    this.selectTab.setValue(event);
    this.idSelected = 0;
    this.selectRole.clear();
    this.selectPermission.clear();

    setTimeout(() => {
      switch (this.selectTab.value) {
        case 0:
          this.setRolePaginator();
          break;
        case 1:
          this.setPermissionPaginator();
          break;
      }
    });
  }

  setRolePaginator() {
    !this.dataSourceRole.paginator ? this.dataSourceRole.paginator = this.rolePaginator : null;
    !this.dataSourceRole.sort ? this.dataSourceRole.sort = this.roleSort : null;
  }

  setPermissionPaginator() {
    !this.dataSourcePermission.paginator ? this.dataSourcePermission.paginator = this.permissionPaginator : null;
    !this.dataSourcePermission.sort ? this.dataSourcePermission.sort = this.permissionSort : null;
  }

  /**
   * CRUD
   */

  insertRole() {
    const dialogRef = this.dialog.open(RoleDialogComponent, {
      width: '450px', data: {
        id: 0,
        roleName: '',
        description: '',
        active: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result !== null) {
          let role = {
            roleName: result.roleName,
            description: result.description
          };

          this.roleService.addRole(role).then((data: any) => {
            this.getRoles();
          }, (err) => {
            this.dialog.open(InfoDialogComponent, {
              width: '450px', data: 'El rol de usuario: ' + role.roleName + ' ya existe.'
            });
          });
        }
      }
    });
  }

  updateRole() {
    this.roleService.getRole(this.idSelected).then((data: any) => {
      const dialogRef = this.dialog.open(RoleDialogComponent, {
        width: '450px', data: data
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result !== null) {
          let role = {
            roleName: result.roleName,
            description: result.description
          };

          this.roleService.updateRole(role, this.idSelected).then((data: any) => {
            this.getRoles();
          }, (err) => {
            this.dialog.open(InfoDialogComponent, {
              width: '450px', data: 'El rol de usuario: ' + role.roleName + ' ya existe.'
            });
          });
        }
        this.selectRole.clear();
        this.idSelected = 0;
      });
    }, (err) => {
      console.log(err);
    });
  }

  deleteRole() {
    this.roleService.getRole(this.idSelected).then((data: any) => {
      let role = data;

      if (role.active) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '450px', data: "Esta seguro que desea eliminar este rol de usuario: " + role.roleName +"?"
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.roleService.deleteRole(this.idSelected).then((data: any) => {
              this.dialog.open(InfoDialogComponent, {
                width: '450px', data: "Rol de Usuario Eliminado con Exito!"
              });
              this.getRoles();
            }, (err) => {
              console.log(err);
            });
          }
          this.selectRole.clear();
          this.idSelected = 0;
        });
      }
    }, (err) => {
      console.log(err);
    });
  }

  insertPermission() {
    const dialogRef = this.dialog.open(PermissionDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null && result !== undefined) {
        console.log(result);
        this.roleService.assignPermission(result).then((data: any) => {
          this.getPermissions();
        }, (err) => {
          console.log(err);
        });
      }
    });
  }

  deletePermission() {
    this.roleService.getRolePermission(this.idSelected).then((data: any) => {
      let rolePermission = data;

      if (rolePermission.active) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '450px', data: "Esta seguro que desea remover este permiso del rol: " + rolePermission.roleName + "?"
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.roleService.removePermission(rolePermission.roleId, rolePermission.permissionId).then((data: any) => {
              this.dialog.open(InfoDialogComponent, {
                width: '450px', data: "Permiso Removido con Exito!"
              });
              this.getPermissions();
            }, (err) => {
              console.log(err);
            });
          }
          this.selectPermission.clear();
          this.idSelected = 0;
        });
      }
    });
  }
}
