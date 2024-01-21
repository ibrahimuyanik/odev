import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddCoordinateDialogComponent } from './add-coordinate-dialog/add-coordinate-dialog.component';
import { ListCoordinateDialogComponent } from './list-coordinate-dialog/list-coordinate-dialog.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    AddCoordinateDialogComponent,
    ListCoordinateDialogComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatDialogModule, MatButtonModule, MatTableModule,
    MatPaginatorModule, MatInputModule, MatFormFieldModule, MatSortModule
  ],
  exports:[
    ListCoordinateDialogComponent
  ]
})
export class DialogModule { }
