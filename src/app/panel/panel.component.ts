import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MockDataService } from '../mock-data.service';
import { Defect } from '../interface/defect';

declare const Plotly: any;

interface Trace {
  mode: string;
  type: string;
  x: number[];
  y: number[];
  hoverinfo: string;
  hovertext: string[];
  marker?: { color: string[], opacity: number[], size: number[] };
}

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit, OnDestroy {
  private markerStyles: { color: string, opacity: number[], size: number };
  private maxSeverity: number;
  private numDefects: number;
  private data: Trace;
  private selectedPointNumber: number;
  private panelSubscription: Subscription;
  private defectSubscription: Subscription;

  constructor(private mockDataService: MockDataService) {
    this.markerStyles = { color: '#FF0000', opacity: [], size: 8 };
    this.maxSeverity = 100;
    const defects = Array.from(this.mockDataService.getDefects().values());
    this.numDefects = defects.length;
    this.data = this.createDefectCircles(defects);
    this.selectedPointNumber = -1;

    this.panelSubscription = this.mockDataService.isPanelUpdatedObservable$.subscribe((isPanelUpdated: boolean) => {
      if (isPanelUpdated) {
        const defects = Array.from(this.mockDataService.getDefects().values());
        this.data = this.createDefectCircles(defects);
        this.selectedPointNumber = -1;
        
        this.createNewPanel();
        this.setSingleDefectSelection('#myPanel');
      }
    });

    this.defectSubscription = this.mockDataService.selectedDefectObservable$.subscribe((defect: Defect) => {
      if (defect.isSelected) {
        if (this.selectedPointNumber !== -1) {
          this.resetAllMarkerStyles();
        }

        for (let index = 0; index < this.numDefects; index++) {
          if (this.data.x[index] === defect.x && this.data.y[index] === defect.y) {
            this.selectedPointNumber = index;
            break;
          }
        }
  
        const color = this.data.marker!.color;
        color[this.selectedPointNumber] = '#0000FF';
        const opacity = this.markerStyles.opacity;
        opacity[this.selectedPointNumber] = defect.severity / this.maxSeverity;
        const size = this.data.marker!.size;
        size[this.selectedPointNumber] = 12;
  
        this.updateMarkerStyles(color, opacity, size, 0);
      }
    });
  }

  ngOnInit(): void {
    this.createNewPanel();
    this.setSingleDefectSelection('#myPanel');
  }

  ngOnDestroy(): void {
    this.panelSubscription.unsubscribe();
    this.defectSubscription.unsubscribe();
  }

  private createDefectCircles(defects: Defect[]): Trace {
    const x: number[] = [];
    const y: number[] = [];
    const hovertext: string[] = [];
    const colors: string[] = [];
    const size: number[] = [];

    defects.forEach((defect: Defect) => {
      x.push(defect.x);
      y.push(defect.y);
      hovertext.push(`${defect.uuid}`);
      colors.push(this.markerStyles.color);
      this.markerStyles.opacity.push(defect.severity / this.maxSeverity);
      size.push(this.markerStyles.size);
    });

    return {
      mode: 'markers',
      type: 'scatter',
      x, y, hoverinfo: 'text', hovertext,
      marker: { color: colors, opacity: this.markerStyles.opacity, size }
    }
  }

  private createNewPanel() {
    const panelLayout = this.mockDataService.getPanelLayout();
    const layout = {
      title: { text: 'Panel' },
      height: window.screen.height * 0.6,
      showlegend: false,
      autosize: true,
      margin: {
        t: 100, b: 30,
        l: 40, r: 30,
      },
      hovermode: 'closest',
      xaxis: {
        color: 'black',
        range: [0, panelLayout.width]
      },
      yaxis: {
        color: 'black',
        range: [0, panelLayout.height]
      },
    };

    const config = {
      displayModeBar: false,
      doubleClick: false,
      // responsive: true,
      // staticPlot: true
    };

    Plotly.newPlot('myPanel', [this.data], layout, config);
  }

  private setSingleDefectSelection(panelName: string) {
    const myPanel: any = document.querySelector(panelName);
    // reference to https://plotly.com/javascript/plotlyjs-events/
    myPanel.on('plotly_click', (data: any) => {
      // console.log(data);

      if (this.selectedPointNumber !== -1) {
        this.resetAllMarkerStyles();

        // Set previous defect unselected
        const prevUUID = `${this.data.x[this.selectedPointNumber]},${this.data.y[this.selectedPointNumber]}`;
        this.mockDataService.setDefectIsSelected(prevUUID, false);
      }

      let uuid = '';
      // let curveNumber = '';
      let color: string[] = [];
      let opacity: number[] = [];
      let size: number[] = [];

      const numDataPoints = data.points.length;
      for (let i = 0; i < numDataPoints; i++) {
        const selectedPoint = data.points[i];
        // console.log(selectedPoint);

        uuid = `${selectedPoint.x},${selectedPoint.y}`;
        // console.log(`Defect ${uuid} is clicked.`);

        this.selectedPointNumber = Number(selectedPoint.pointNumber);
        // curveNumber = selectedPoint.curveNumber;
        color = selectedPoint.data.marker.color;
        opacity = selectedPoint.data.marker.opacity;
        size = selectedPoint.data.marker.size;
      }

      if (uuid !== '') {
        color[this.selectedPointNumber] = '#0000FF';
        size[this.selectedPointNumber] = 12;
        this.updateMarkerStyles(color, opacity, size, 0);
        
        this.mockDataService.setDefectIsSelected(uuid, true);
      }
    });
  }
  
  private updateMarkerStyles(color: string[], opacity: number[], size: number[], curveNumber: number) {
    const update = { 'marker': { color, opacity, size } };
    Plotly.restyle('myPanel', update, [curveNumber]);
  }

  private resetAllMarkerStyles() {
    this.data.marker!.color[this.selectedPointNumber] = this.markerStyles.color;
    this.data.marker!.opacity = this.markerStyles.opacity;
    this.data.marker!.size[this.selectedPointNumber] = this.markerStyles.size;
  }
}
