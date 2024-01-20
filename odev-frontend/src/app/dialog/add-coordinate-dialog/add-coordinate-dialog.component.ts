import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-coordinate-dialog',
  templateUrl: './add-coordinate-dialog.component.html',
  styleUrls: ['./add-coordinate-dialog.component.css']
})
export class AddCoordinateDialogComponent extends BaseDialog<AddCoordinateDialogComponent> {

  constructor(dialogRef:MatDialogRef<AddCoordinateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  any,
    private formBuilder:FormBuilder,
    private apiService:ApiService){
      super(dialogRef)
    }

    addForm:FormGroup;

    ngOnInit(){
      this.addForm = this.formBuilder.group({
        name: ['', Validators.required],
        number: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      })
    }

    async add(){
      if(this.addForm.valid){

        var _data = {name:this.addForm.value.number, number: this.addForm.value.number, coordinates: this.data}
        
        await this.apiService.create({
          name: this.addForm.value.name,
          number: this.addForm.value.number,
          coordinates: this.data
        })
        console.log(_data)

        this.close()
      }
    }


}
