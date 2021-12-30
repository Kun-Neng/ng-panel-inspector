import { Component, OnInit } from '@angular/core';

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

  constructor() {
    this.rowHeight = '33.1vh';
    this.tileStyle = {
      background: 'lightgreen'
    };
  }

  ngOnInit(): void {
  }

}
