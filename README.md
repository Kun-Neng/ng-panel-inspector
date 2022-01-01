# NgPanelInspector

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## **Software Requirements**
* 2 data models:
    * 100 items of 'Defect' (randomly generated) \
    `{ uuid: string, x: number, y: number, severity: number (10-100) }`
    * 1 'Panel' \
    `{ width: number, height: number}`
* At least 3 components as follows:
    * Left panel (as TableComponent)
        1. Table of defects with 3 columns Index number, x, y
        2. Each row should be selectable
        3. Row selection marks the defect in the top right panel
    * Top right panel (as PanelComponent)
        1. Based on width and height of the panel data model, create a visualization of the panel and the corresponding defects by their locations
        2. Every defect will be presented by a red color circle with transparency level by the severity property of the defect
        3. Add event listener to the circles to mark selection back to table
    * Bottom component (as DefectDetailsComponent)
        1. Build master-details of the selected defect from the list, to control the severity level with slider input

## **Data Flow**
* real-time
    1. defect data -> table
    2. defect data -> panel
* event driven
    1. (click) defect in panel -> table, defect-details
    2. (click) row in table -> panel, defect-details
    3. (change) slider in defect-details -> modify defect data

## **Software Design**
* interface
  * defect
    ```
    {
        uuid: string;
        x: number;
        y: number;
        severity: number;
        isSelected: boolean;
    }
    ```
  * panel
    ```
    {
        width: number;
        height: number;
    }
    ```
* MockDataService
  * create `defects` map to store the Defect instances
  * create `selectedDefect` Subject and `selectedDefectObservable$` Observable to notify all that which defect is selected
* MainComponent (Angular Material Grid List)
  * consists of the following 3 main components located in 3 partitions
* TableComponent (Angular Material Table)
  * 100 rows, 4 columes (Index, X, Y, Severity)
  * `defectSubscription` is used to subscribe the selected defect
  * `selectedRow` is used to record the selected row
  * click event
    1. set previously selected defect unselected
    2. update `selectedRow`
    3. notify that this defect is selected
* PanelComponent (Plotly.js)
  * draw defect locations as scatter markers
  * `defectSubscription` is used to subscribe the selected defect
  * `selectedPointNumber` is used to record the selected marker
  * click event
    1. reset all the marker styles
    2. set previously selected defect unselected
    3. update `selectedPointNumber`
    4. update the style of selected marker
    5. notify that this defect is selected
* DefectDetailsComponent (Angular Material Slider)
  * change event
    1. notify that the severity of selected defect is changed
