import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Distrito} from '../../../models/distrito';
import {Role} from '../../../models/role';
import {EmployeesService} from '../../../services/employees.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  //CREATE FORM GROUP
  form : FormGroup;

  title: string = 'Crear Usuario';
  click: string = 'guardar';

  distritoList: Distrito[];
  roleList: Role[];

  errorDistrito: boolean = false;
  errorRole: boolean = false;

  distritoId: number = 0;
  roleId: number = 0;

  constructor(private fb : FormBuilder, public dialogRef: MatDialogRef<UserDialogComponent>,
              public employeesService: EmployeesService) {
    this.form = fb.group({
      txt_identification: '',
      txt_firstName: ['', Validators.required],
      txt_lastName: ['', Validators.required],
      txt_birthDate: ['', Validators.required],
      txt_gender: '',
      txt_direction: '',
      txt_celPhone: '',
      txt_Image: '',
      txt_username: ['', Validators.required],
      txt_password: ['', Validators.required],
      txt_email: ''
    });
  }

  onNoClick(): void {
    this.click = 'cancelar';
  }

  ngOnInit() {

  }

  save() {

  }
}
