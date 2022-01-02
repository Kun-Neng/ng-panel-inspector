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
  private selectedRow: string;
  private panelSubscription: Subscription;
  private defectSubscription: Subscription;

  constructor(private mockDataService: MockDataService) {
    this.columnTitles = ['i', 'x', 'y', 's'];
    this.dataSource.data = Array.from(this.mockDataService.getDefects().values());
    // console.log(this.dataSource);
    this.selectedRow = '';

    this.panelSubscription = this.mockDataService.isPanelUpdatedObservable$.subscribe((isPanelUpdated: boolean) => {
      if (isPanelUpdated) {
        this.dataSource.data = Array.from(this.mockDataService.getDefects().values());
        this.selectedRow = '';
      }
    });

    this.defectSubscription = this.mockDataService.selectedDefectObservable$.subscribe((defect: Defect) => {
      this.selectedRow = defect.uuid;

      const thisRow = this.dataSource.data.find((defectInTable: Defect) => defectInTable.uuid === defect.uuid);
      if (thisRow) {
        thisRow.isSelected = defect.isSelected;
      }
      /*this.dataSource.data = this.dataSource.data.filter((defectInTable: Defect) => {
        if (defectInTable.uuid === defect.uuid) {
          defectInTable.isSelected = defect.isSelected;
        }
        return true;
      });*/
    });
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.panelSubscription.unsubscribe();
    this.defectSubscription.unsubscribe();
  }

  getDefect(row: Defect) {
    // console.log(row);

    // Unselect previous row
    if (this.selectedRow !== '') {
      this.mockDataService.setDefectIsSelected(this.selectedRow, false);
    }
    this.selectedRow = row.uuid;
    
    row.isSelected = !row.isSelected;
    this.mockDataService.setDefectIsSelected(row.uuid, row.isSelected);
  }
}
