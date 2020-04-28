import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-spam-dialog',
  templateUrl: './spam-dialog.component.html',
  styleUrls: ['./spam-dialog.component.scss']
})
export class SpamDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _matDialogRef: MatDialogRef<SpamDialogComponent>) {
  }

  onCloseClick(confirm: boolean) {
    this._matDialogRef.close(confirm);
  }

}
