import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MockDataService } from '../mock-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Defect } from '../interface/defect';
import { DEFECT_SOURCE } from '../defect-source';

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
      if (defect.sourceFrom === DEFECT_SOURCE.PANEL) {
        this.selectedRow = defect.uuid;

        const clickedIndex = this.dataSource.data.findIndex((defectInTable: Defect) => defectInTable.uuid === defect.uuid);
        if (clickedIndex !== -1) {
          this.scrollToDefectIndex(String(clickedIndex));
        }

        const thisRow = this.dataSource.data[clickedIndex];
        if (thisRow) {
          thisRow.isSelected = defect.isSelected;
        }
        /*this.dataSource.data = this.dataSource.data.filter((defectInTable: Defect) => {
          if (defectInTable.uuid === defect.uuid) {
            defectInTable.isSelected = defect.isSelected;
          }
          return true;
        });*/
      }
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
    this.mockDataService.setDefectIsSelected(row.uuid, row.isSelected, DEFECT_SOURCE.TABLE);
  }

  private scrollToDefectIndex(defectID: string) {
    let element = document.getElementById(defectID);
    // console.log(element);
    if (element && element != undefined && element != null) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  }
}
