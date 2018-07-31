import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Size} from '../../../models/size';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-size-dialog',
  templateUrl: './size-dialog.component.html',
  styleUrls: ['./size-dialog.component.scss']
})
export class SizeDialogComponent implements OnInit {

  //CREATE FORM GROUP
  form : FormGroup;

  title: string;
  click: string = 'guardar';

  constructor(private fb : FormBuilder, public dialogRef: MatDialogRef<SizeDialogComponent>, @Inject(MAT_DIALOG_DATA) public size: Size) {
    this.form = fb.group({
      txt_size: ['', Validators.required]
    });

    if (this.size.id === 0) this.title = "Insertar Color"; else {
      this.title = "Modificar Color";
      this.form.get('txt_size').setValue(this.size.sizeName);
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
      this.size.sizeName = this.form.get('txt_size').value;
      this.dialogRef.close(this.size.sizeName);
    }
  }
}
