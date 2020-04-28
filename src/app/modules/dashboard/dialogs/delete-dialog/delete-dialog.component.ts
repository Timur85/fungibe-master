import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _matDialogRef: MatDialogRef<DeleteDialogComponent>) {
  }

  onCloseClick(confirm: boolean) {
    this._matDialogRef.close(confirm);
  }

}
