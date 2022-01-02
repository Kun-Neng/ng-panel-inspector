import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Panel } from '../interface/panel';

@Component({
  selector: 'app-panel-setup-dialog',
  templateUrl: './panel-setup-dialog.component.html',
  styleUrls: ['./panel-setup-dialog.component.css']
})
export class PanelSetupDialogComponent implements OnInit {
  panel: Panel;

  constructor(public dialogRef: MatDialogRef<PanelSetupDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Panel) {
    this.panel = data;
  }

  ngOnInit(): void {
  }

  checkValue(event: KeyboardEvent, element: HTMLInputElement) {
    // console.log(event.key);
    // console.log(element.value);

    if (event.key === 'e' || event.key === '-') {
      event.preventDefault();
    }

    const value = parseInt(`${element.value}${event.key}`);
    // console.log(value);
    if (value < 10 || value > 1E9) {
      event.preventDefault();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSetup(): void {
    this.dialogRef.close(this.panel);
  }

  onCancel(): void {
    this.dialogRef.close(undefined);
  }
}
