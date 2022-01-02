import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MockDataService } from '../mock-data.service';
import { Defect } from '../interface/defect';

@Component({
  selector: 'app-defect-details',
  templateUrl: './defect-details.component.html',
  styleUrls: ['./defect-details.component.css']
})
export class DefectDetailsComponent implements OnInit, OnDestroy {
  showTicks: boolean = true;
  tickInterval: number = 10;
  max: number = 100;
  min: number = 10;
  step: number = 1;

  defectDetails: Defect;

  private panelSubscription: Subscription;
  private defectSubscription: Subscription;

  constructor(private mockDataService: MockDataService) {
    this.defectDetails = this.resetDefectDetails();

    this.panelSubscription = this.mockDataService.isPanelUpdatedObservable$.subscribe((isPanelUpdated: boolean) => {
      if (isPanelUpdated) {
        this.defectDetails = this.resetDefectDetails();
      }
    });

    this.defectSubscription = this.mockDataService.selectedDefectObservable$.subscribe((defect: Defect) => {
      if (defect.isSelected) {
        this.defectDetails = defect;
      }
    });
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.panelSubscription.unsubscribe();
    this.defectSubscription.unsubscribe();
  }

  getSliderTickInterval(): number {
    if (this.showTicks) {
      return this.tickInterval;
    }
    return 0;
  }

  formatLabel(value: number) {
    return value;
  }

  updateSeverity(value: number) {
    // console.log(value);
    this.mockDataService.setDefectSeverity(this.defectDetails.uuid, value);
  }

  private resetDefectDetails(): Defect {
    return {
      uuid: '',
      x: -1,
      y: -1,
      severity: -1,
      isSelected: false
    };
  }
}
