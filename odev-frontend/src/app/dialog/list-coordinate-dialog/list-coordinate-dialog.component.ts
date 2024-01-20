import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list-coordinate-dialog',
  templateUrl: './list-coordinate-dialog.component.html',
  styleUrls: ['./list-coordinate-dialog.component.css']
})
export class ListCoordinateDialogComponent extends BaseDialog<ListCoordinateDialogComponent> {

  constructor(dialogRef:MatDialogRef<ListCoordinateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  any,
    private apiService:ApiService){
      super(dialogRef);
    }

    



}
