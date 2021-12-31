import { Injectable } from '@angular/core';
import { Defect } from './interface/defect';
import { Panel } from './interface/panel';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private panelLayout: Panel = { width: 300, height: 400 };
  private numDefects: number = 100;
  private defects: Map<string, Defect> = new Map<string, Defect>();

  constructor() { }

  getPanelLayout(): Panel {
    return this.panelLayout;
  }

  getDefects(): Map<string, Defect> {
    return this.defects;
  }

  createPanel(panelLayout: Panel = this.panelLayout): number {
    this.panelLayout = panelLayout;
    const pixels = this.panelLayout.width * this.panelLayout.height;
    let chosenIndex: number[] = [];

    while (chosenIndex.length < this.numDefects) {
      const rand = Math.floor(Math.random() * pixels);
      if (chosenIndex.includes(rand)) {
        continue;
      }
      chosenIndex.push(rand);

      const y = Math.floor(rand / panelLayout.width);
      const x = rand % panelLayout.width;
      const defect = this.createDefect(x, y);
      this.defects.set(defect.uuid, defect);
    }

    return this.defects.size;
  }

  createDefect(x: number, y: number): Defect {
    const uuid = `${x},${y}`;
    const severity = Math.floor(Math.random() * 90) + 10;
    return {
      uuid, x, y, severity,
      isSelected: false
    };
  }
}
