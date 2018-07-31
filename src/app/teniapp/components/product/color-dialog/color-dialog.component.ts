import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Color} from '../../../models/color';

@Component({
  selector: 'app-color-dialog',
  templateUrl: './color-dialog.component.html',
  styleUrls: ['./color-dialog.component.scss']
})
export class ColorDialogComponent implements OnInit {

  //CREATE FORM GROUP
  form : FormGroup;

  title: string;
  click: string = 'guardar';

  constructor(private fb : FormBuilder, public dialogRef: MatDialogRef<ColorDialogComponent>, @Inject(MAT_DIALOG_DATA) public color: Color) {
    this.form = fb.group({
      txt_color: ['', Validators.required]
    });

    if (this.color.id === 0) this.title = "Insertar Color"; else {
      this.title = "Modificar Color";
      this.form.get('txt_color').setValue(this.color.colorName);
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
      this.color.colorName = this.form.get('txt_color').value;
      this.dialogRef.close(this.color.colorName);
    }
  }
}
