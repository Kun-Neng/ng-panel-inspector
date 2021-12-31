import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MainComponent } from './main/main.component';
import { TableComponent } from './table/table.component';
import { PanelComponent } from './panel/panel.component';
import { DefectDetailsComponent } from './defect-details/defect-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TableComponent,
    PanelComponent,
    DefectDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
