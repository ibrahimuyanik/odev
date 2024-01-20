import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCoordinateDialogComponent } from './add-coordinate-dialog/add-coordinate-dialog.component';

import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListCoordinateDialogComponent } from './list-coordinate-dialog/list-coordinate-dialog.component';

@NgModule({
  declarations: [
    AddCoordinateDialogComponent,
    ListCoordinateDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule, MatButtonModule
  ],
  exports:[
    
  ]
})
export class DialogModule { }
