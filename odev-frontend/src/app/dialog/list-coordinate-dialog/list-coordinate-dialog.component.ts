import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoordinateData } from 'src/app/contracts/coordinate-data.model';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'list-coordinate-dialog.component',
  styleUrls: ['list-coordinate-dialog.component.css'],
  templateUrl: 'list-coordinate-dialog.component.html',
})
export class ListCoordinateDialogComponent  {
  displayedColumns: string[] = ['name', 'number', 'coordinates'];
  dataSource: MatTableDataSource<CoordinateData> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService:ApiService) {}

  async getData(){
    const apiData =  await this.apiService.readData()

    this.dataSource = new MatTableDataSource<CoordinateData>(apiData)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
   
  }

  
  async ngOnInit(){
    this.getData()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


