import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MockDataService } from '../mock-data.service';
import { PanelSetupDialogComponent } from '../panel-setup-dialog/panel-setup-dialog.component';
import { Panel } from '../interface/panel';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  panelWidth: number;
  panelHeight: number;
  rowHeight: string;
  tileStyle: {
    background: string;
  };

  private panelSubscription: Subscription;

  constructor(public dialog: MatDialog, private mockDataService: MockDataService) {
    this.rowHeight = '33.1vh';
    this.tileStyle = {
      background: 'white'
    };

    this.panelWidth = 1920;
    this.panelHeight = 1080;
    this.mockDataService.createPanel({ width: this.panelWidth, height: this.panelHeight });

    this.panelSubscription = this.mockDataService.isPanelUpdatedObservable$.subscribe((isPanelUpdated: boolean) => {
      if (isPanelUpdated) {
        this.mockDataService.createPanel();
      }
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.panelSubscription.unsubscribe();
  }

  openPanelSetupDialog() {
    const dialogRef = this.dialog.open(PanelSetupDialogComponent, {
      autoFocus: false,
      data: { width: this.panelWidth, height: this.panelHeight }
    });
    dialogRef.afterClosed().subscribe((result: Panel) => {
      // console.log(result);

      if (result !== undefined) {
        this.panelWidth = result.width;
        this.panelHeight = result.height;
        this.mockDataService.setPanelLayout(result);
      }
    });
  }
}
