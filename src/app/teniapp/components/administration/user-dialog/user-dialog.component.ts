import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {Distrito} from '../../../models/distrito';
import {Role} from '../../../models/role';
import {EmployeesService} from '../../../services/employees.service';
import {RoleService} from '../../../services/role.service';

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
  errorGender: boolean = false;
  errorBirthDate: boolean = false;

  distritoId: number = 0;
  roleId: number = 0;

  maxDate: any;

  constructor(private fb : FormBuilder, public dialogRef: MatDialogRef<UserDialogComponent>,
              public employeesService: EmployeesService, public roleService: RoleService) {
    this.form = fb.group({
      txt_identification: '',
      txt_firstName: ['', Validators.required],
      txt_lastName: ['', Validators.required],
      txt_birthDate: [{value: '', disabled: true}, Validators.required],
      txt_gender: '',
      txt_direction: '',
      txt_celPhone: '',
      txt_image: '',
      txt_username: ['', Validators.required],
      txt_password: ['', Validators.required],
      txt_email: ''
    });

    this.maxDate = new Date();
  }

  onNoClick(): void {
    this.click = 'cancelar';
  }

  ngOnInit() {
    this.employeesService.distritoList().then((data: any[]) => {
      this.distritoList = data;
    });

    this.roleService.roleList().then((data: any[]) => {
      this.roleList = data;
    });
  }

  save() {
    if (this.click === 'cancelar') {
      this.dialogRef.close(null);
    } else {
      if (this.roleId === 0) {
        this.errorRole = true;
      } else if (this.distritoId === 0) {
        this.errorDistrito = true;
      } else if (this.form.get('txt_gender').value === '') {
        this.errorGender = true;
      } else if (this.form.get('txt_birthDate').value === '') {
        this.errorGender = false;
        this.errorBirthDate = true;
      } else {
        this.errorBirthDate = false;
        let employees = {
          identification: this.form.get('txt_identification').value,
          firstname: this.form.get('txt_firstName').value,
          lastname: this.form.get('txt_lastName').value,
          birthdate: this.form.get('txt_birthDate').value,
          gender: this.form.get('txt_gender').value,
          direction: this.form.get('txt_direction').value,
          celphone: this.form.get('txt_celPhone').value,
          image: this.form.get('txt_image').value,
          distrito: {
            id: this.distritoId
          }
        };

        let users = {
          username: this.form.get('txt_username').value,
          password: this.form.get('txt_password').value,
          email: this.form.get('txt_email').value,
          employees: {
            id: 0
          }
        };

        let role = {
          id: this.roleId
        };

        let data = {
          employees: employees,
          users: users,
          role: role
        };

        this.dialogRef.close(data);
      }
    }
  }
}
