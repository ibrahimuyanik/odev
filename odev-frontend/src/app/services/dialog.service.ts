import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog) { }

  openDialog(dialogParameters: Partial<DialogParameters>): void {
    const dialogRef = this.dialog.open(dialogParameters.componentType, {
      width: dialogParameters.options?.width,
      height: dialogParameters.options?.height,
      position: dialogParameters.options?.position,
      data: dialogParameters.data
    });
    // this.dialog.open() diyerek belirtilen component'i açıyor ve data olan yes değerini gönderiyoruz

    dialogRef.afterClosed().subscribe(result => {
      if (result == dialogParameters.data) {  // dialog'da evet'e tıklanmışsa afterClosed() callback metodu çalışacak
        dialogParameters.afterClosed();
      }
    });
}
}

export class DialogParameters{
  componentType:ComponentType<any>;
  data: any;
  afterClosed: () => void;
  options?: Partial<DialogOptions>;
}

export class DialogOptions{
  width?:string = "250px";
  height?:string;
  position?: DialogPosition
}