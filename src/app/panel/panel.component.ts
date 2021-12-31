import { Component, OnInit } from '@angular/core';
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
  marker?: { color: string, opacity: number[], size: number };
}

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  constructor(private mockDataService: MockDataService) { }

  ngOnInit(): void {
    const panelLayout = this.mockDataService.getPanelLayout();
    const defects = Array.from(this.mockDataService.getDefects().values());
    const data = [this.createDefectCircles(defects)];

    const layout = {
      title: { text: 'Panel' },
      height: window.screen.height * 0.6,
      showlegend: false,
      autosize: true,
      margin: {
        t: 40, b: 30,
        l: 40, r: 30,
      },
      scene: {
        // hovermode: 'closest'
        hovermode: false
      },
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
      // responsive: true,
      // staticPlot: true
    };

    Plotly.newPlot('myPanel', data, layout, config);
  }

  private createDefectCircles(defects: Defect[]): Trace {
    const x: number[] = [];
    const y: number[] = [];
    const hovertext: string[] = [];
    const opacity: number[] = [];

    defects.forEach((defect: Defect) => {
      x.push(defect.x);
      y.push(defect.y);
      hovertext.push(`${defect.uuid}: ${defect.severity}`);
      opacity.push(defect.severity / 100);
    });

    return {
      mode: 'markers',
      type: 'scatter',
      x, y, hoverinfo: 'text', hovertext,
      marker: { color: '#FF0000', opacity: opacity, size: 10 }
    }
  }
}
