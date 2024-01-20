import { Injectable } from '@angular/core';
import { jsPanel } from "jspanel4";

@Injectable({
  providedIn: 'root'
})
export class JsPanelService {

  constructor() { }

  openDialog(data:any){
    const panel = jsPanel.create({
      content: `
      <div class="container">
      <form id="infoForm">
      <label for="name">İsim:</label>
      <input type="text" id="name" class="form-control" required><br>

      <label for="number">Numara:</label>
      <input type="number" id="number" class="form-control" required><br>

      <button type="button" class="btn btn-primary" onclick="submitForm()">Kaydet</button>
    </form>
    </div>

                `,
      theme: 'primary',
      headerTitle: 'deneme',
      panelSize: '450 300'
    });

   }

   submitForm(){
    
   }

}
