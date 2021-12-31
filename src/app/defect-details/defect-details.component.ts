import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Defect } from '../interface/defect';
import { MockDataService } from '../mock-data.service';

@Component({
  selector: 'app-defect-details',
  templateUrl: './defect-details.component.html',
  styleUrls: ['./defect-details.component.css']
})
export class DefectDetailsComponent implements OnInit, OnDestroy {
  autoTicks: boolean = false;
  showTicks: boolean = true;
  tickInterval: number = 1;
  max: number = 100;
  min: number = 10;
  step: number = 1;

  defectDetails: Defect;

  private defectSubscription: Subscription;

  constructor(private mockDataService: MockDataService) {
    this.defectDetails = {
      uuid: '',
      x: -1,
      y: -1,
      severity: -1,
      isSelected: false
    };

    this.defectSubscription = this.mockDataService.$selectedDefectObservable.subscribe((defect: Defect) => {
      if (defect.isSelected) {
        this.defectDetails = {
          uuid: defect.uuid,
          x: defect.x,
          y: defect.y,
          severity: defect.severity,
          isSelected: defect.isSelected
        };
      }
    });
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.defectSubscription.unsubscribe();
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
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
}
