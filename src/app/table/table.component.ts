import { Component, OnInit } from '@angular/core';
import { MockDataService } from '../mock-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Defect } from '../interface/defect';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  columnTitles: string[];
  dataSource = new MatTableDataSource<Defect>();

  constructor(private mockDataService: MockDataService) {
    this.columnTitles = ['i', 'x', 'y'];
    this.dataSource.data = Array.from(this.mockDataService.getDefects().values());
    // console.log(this.dataSource);
  }

  ngOnInit(): void {
    
  }
}
