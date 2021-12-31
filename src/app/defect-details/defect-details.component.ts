import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-defect-details',
  templateUrl: './defect-details.component.html',
  styleUrls: ['./defect-details.component.css']
})
export class DefectDetailsComponent implements OnInit {
  autoTicks: boolean = false;
  showTicks: boolean = true;
  tickInterval: number = 1;
  max: number = 100;
  min: number = 10;
  step: number = 1;
  severityValue = 10;

  constructor() { }

  ngOnInit(): void {
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
}
