import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {RoleService} from '../../../services/role.service';

@Component({
  selector: 'app-permission-dialog',
  templateUrl: './permission-dialog.component.html',
  styleUrls: ['./permission-dialog.component.scss']
})
export class PermissionDialogComponent implements OnInit {

  //CREATE FORM GROUP
  form : FormGroup;

  title: string = 'Asignar Permisos de Usuarios';
  click: string = 'guardar';
  errorRole: boolean = false;
  errorPermission: boolean = false;

  dataRole: any[];
  dataPermission: any[];

  roleId: number = 0;
  permissionId: number = 0;

  constructor(private fb : FormBuilder,
              public dialogRef: MatDialogRef<PermissionDialogComponent>, public roleService: RoleService) {
    this.form = fb.group({});
  }

  onNoClick(): void {
    this.click = 'cancelar';
  }

  ngOnInit() {
    this.roleService.roleList().then((data: any[]) => {
      this.dataRole = data;
    });

    this.roleService.permissionList().then((data: any[]) => {
      this.dataPermission = data;
    });
  }

  save() {
    if (this.click === 'cancelar') {
      this.dialogRef.close(null);
    } else {
      if (this.roleId === 0) {
        this.errorRole = true;
      } else if (this.permissionId === 0) {
        this.errorPermission = true;
      } else {
        let rolePermission: any = {
          role: {
            id: this.roleId
          },
          permission: {
            id: this.permissionId
          }
        };
        this.dialogRef.close(rolePermission);
      }
    }
  }
}
