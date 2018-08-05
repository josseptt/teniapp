import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Role} from '../../../models/role';

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss']
})
export class RoleDialogComponent implements OnInit {

  //CREATE FORM GROUP
  form : FormGroup;

  title: string;
  click: string = 'guardar';

  constructor(private fb : FormBuilder,
              public dialogRef: MatDialogRef<RoleDialogComponent>, @Inject(MAT_DIALOG_DATA) public role: Role) {
    this.form = fb.group({
      txt_roleName: ['', Validators.required],
      txt_description: ['']
    });

    if (this.role.id === 0) this.title = "Insertar Rol de Usuario"; else {
      this.title = "Modificar Rol de Usuario";
      this.form.get('txt_roleName').setValue(this.role.roleName);
      this.form.get('txt_description').setValue(this.role.description);
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
      this.role.roleName = this.form.get('txt_roleName').value;
      this.role.description = this.form.get('txt_description').value;
      this.dialogRef.close(this.role);
    }
  }
}
