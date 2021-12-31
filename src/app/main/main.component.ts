import { Component, OnInit } from '@angular/core';
import { MockDataService } from '../mock-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  rowHeight: string;
  tileStyle: {
    background: string;
  };

  constructor(private mockDataService: MockDataService) {
    this.rowHeight = '33.1vh';
    this.tileStyle = {
      background: 'lightgreen'
    };

    this.mockDataService.createPanel({ width: 300, height: 400 });
  }

  ngOnInit(): void {
  }

}
