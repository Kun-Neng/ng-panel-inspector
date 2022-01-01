import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Defect } from './interface/defect';
import { Panel } from './interface/panel';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private panelLayout: Panel = { width: 300, height: 400 };
  private numDefects: number = 100;
  private defects: Map<string, Defect> = new Map<string, Defect>();
  private selectedDefect = new Subject<Defect>();
  selectedDefectObservable$ = this.selectedDefect.asObservable();

  constructor() { }

  getPanelLayout(): Panel {
    return this.panelLayout;
  }

  getDefects(): Map<string, Defect> {
    return this.defects;
  }

  setDefectSeverity(uuid: string, severity: number) {
    if (this.defects.has(uuid)) {
      const thisDefect = this.defects.get(uuid);
      thisDefect!.severity = severity;
      this.selectedDefect.next(thisDefect!);
    }
  }

  setAllDefectsSelected(isSelected: boolean) {
    this.defects.forEach((defect: Defect) => {
      this.setDefectIsSelected(defect.uuid, isSelected);
    });
  }

  setDefectIsSelected(uuid: string, isSelected: boolean) {
    if (this.defects.has(uuid)) {
      const thisDefect = this.defects.get(uuid);
      thisDefect!.isSelected = isSelected;
      this.selectedDefect.next(thisDefect!);
    }
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
