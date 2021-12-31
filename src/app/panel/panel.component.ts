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
  marker?: { color: string[], opacity: number[], size: number[] };
}

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  private oriMarkerStyle: { color: string, size: number };
  private numDefects: number;
  private data: Trace;

  constructor(private mockDataService: MockDataService) {
    this.oriMarkerStyle = { color: '#FF0000', size: 8 };
    const defects = Array.from(this.mockDataService.getDefects().values());
    this.numDefects = defects.length;
    this.data = this.createDefectCircles(defects);
  }

  ngOnInit(): void {
    const panelLayout = this.mockDataService.getPanelLayout();
    const layout = {
      title: { text: 'Panel' },
      height: window.screen.height * 0.6,
      showlegend: false,
      autosize: true,
      margin: {
        t: 40, b: 30,
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
    
    const myPanel: any = document.querySelector('#myPanel');
    // reference to https://plotly.com/javascript/plotlyjs-events/
    myPanel.on('plotly_click', (data: any) => {
      // console.log(data);

      let uuid = '';
      let pointNumber = '';
      let curveNumber = '';
      let color = [];
      let opacity = [];
      let size = [];

      for (let i = 0; i < data.points.length; i++) {
        const selectedPoint = data.points[i];
        // console.log(selectedPoint);

        uuid = `${selectedPoint.x},${selectedPoint.y}`;
        // console.log(`Defect ${uuid} is clicked.`);

        pointNumber = selectedPoint.pointNumber;
        curveNumber = selectedPoint.curveNumber;
        // console.log(pointNumber, curveNumber);
        color = selectedPoint.data.marker.color;
        opacity = selectedPoint.data.marker.opacity;
        size = selectedPoint.data.marker.size;
      }

      if (uuid !== '') {
        if (color[pointNumber] === this.oriMarkerStyle.color) {
          color[pointNumber] = '#0000FF';
          size[pointNumber] = 12;
          this.mockDataService.setDefectIsSelected(uuid, true);
        } else {
          color[pointNumber] = this.oriMarkerStyle.color;
          size[pointNumber] = this.oriMarkerStyle.size;
          this.mockDataService.setDefectIsSelected(uuid, false);
        }

        const update = { 'marker': { color, opacity, size } };
        Plotly.restyle('myPanel', update, [curveNumber]);
      }
    });
  }

  private createDefectCircles(defects: Defect[]): Trace {
    const x: number[] = [];
    const y: number[] = [];
    const hovertext: string[] = [];
    const colors: string[] = [];
    const opacity: number[] = [];
    const size: number[] = [];

    defects.forEach((defect: Defect) => {
      x.push(defect.x);
      y.push(defect.y);
      hovertext.push(`${defect.uuid}: ${defect.severity}`);
      colors.push(this.oriMarkerStyle.color);
      opacity.push(defect.severity / 100);
      size.push(this.oriMarkerStyle.size);
    });

    return {
      mode: 'markers',
      type: 'scatter',
      x, y, hoverinfo: 'text', hovertext,
      marker: { color: colors, opacity, size }
    }
  }
}
