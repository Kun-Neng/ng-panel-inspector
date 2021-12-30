import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MainComponent } from './main/main.component';
import { TableComponent } from './table/table.component';
import { PanelComponent } from './panel/panel.component';
import { DefectDetailComponent } from './defect-detail/defect-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TableComponent,
    PanelComponent,
    DefectDetailComponent
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
