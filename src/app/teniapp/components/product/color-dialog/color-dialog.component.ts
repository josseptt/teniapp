import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Color} from '../../../models/color';

@Component({
  selector: 'app-color-dialog',
  templateUrl: './color-dialog.component.html',
  styleUrls: ['./color-dialog.component.scss']
})
export class ColorDialogComponent implements OnInit {

  title: string;

  constructor(public dialogRef: MatDialogRef<ColorDialogComponent>, @Inject(MAT_DIALOG_DATA) public color: Color) {
    if (this.color.id === 0) this.title = "Insertar Color"; else this.title = "Modificar Color";
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
