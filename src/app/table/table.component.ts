import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MockDataService } from '../mock-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Defect } from '../interface/defect';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  columnTitles: string[];
  dataSource = new MatTableDataSource<Defect>();
  private defectSubscription: Subscription;

  constructor(private mockDataService: MockDataService) {
    this.columnTitles = ['i', 'x', 'y'];
    this.dataSource.data = Array.from(this.mockDataService.getDefects().values());
    // console.log(this.dataSource);

    this.defectSubscription = this.mockDataService.$selectedDefectObservable.subscribe((defect: Defect) => {
      console.log(defect);
      const thisDefect = this.dataSource.data.find((defectInTable: Defect) => defectInTable.uuid === defect.uuid);
      if (thisDefect) {
        thisDefect.isSelected = defect.isSelected;
      }
    });
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.defectSubscription.unsubscribe();
  }

  getDefect(row: Defect) {
    // console.log(row);
    row.isSelected = !row.isSelected;
    this.mockDataService.setDefectIsSelected(row.uuid, row.isSelected);
  }
}
