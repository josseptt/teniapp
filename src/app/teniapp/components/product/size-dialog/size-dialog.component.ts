import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Size} from '../../../models/size';

@Component({
  selector: 'app-size-dialog',
  templateUrl: './size-dialog.component.html',
  styleUrls: ['./size-dialog.component.scss']
})
export class SizeDialogComponent implements OnInit {

  title: string;

  constructor(public dialogRef: MatDialogRef<SizeDialogComponent>, @Inject(MAT_DIALOG_DATA) public size: Size) {
    if (this.size.id === 0) this.title = "Insertar Tamaño"; else this.title = "Modificar Tamaño";
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
