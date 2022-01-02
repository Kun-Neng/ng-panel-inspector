# NgPanelInspector

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## **Software Requirements**
* 2 data models
  * 100 randomly generated items of `Defect` \
  `{ uuid: string, x: number, y: number, severity: number (10-100) }`
  * 1 `Panel` \
    `{ width: number, height: number}`
* At least 3 major components
  * Left panel (named as TableComponent)
    * Table of defects with 3 columns Index number, x, y
    * Each row should be selectable
    * Row selection marks the defect in the top right panel
  * Top right panel (named as PanelComponent)
    * Based on width and height of the panel data model, create a visualization of the panel and the corresponding defects by their locations
    * Every defect will be presented by a red color circle with transparency level by the severity property of the defect
    * Add event listener to the circles to mark selection back to table
  * Bottom component (named as DefectDetailsComponent)
    * Build master-details of the selected defect from the list, to control the severity level with slider input

## **Data Flows**
* real-time
  1. defect &#8594; table
  2. defect &#8594; panel
* event driven
  1. [click] marker in panel &#8594; table & defect-details
  2. [click] row in table &#8594; panel & defect-details
  3. [change] slider in defect-details &#8594; modify defect

## **Component Design**
* interface
  * `Defect`
    ```
    {
        uuid: string;
        x: number;
        y: number;
        severity: number;
        isSelected: boolean;
    }
    ```
  * `Panel`
    ```
    {
        width: number;
        height: number;
    }
    ```
* MockDataService
  * `defects` map: stores the `Defect` instances
  * `selectedDefect` subject & `selectedDefectObservable$` observable: notify all components that which defect is selected
* MainComponent ([Angular Material Grid List](https://material.angular.io/components/grid-list/overview))
  * 3 major components located in 3 partitions
* TableComponent ([Angular Material Table](https://material.angular.io/components/table/overview))
  * 100 rows, 4 columns (`Index`, `X`, `Y`, `Severity`)
  * `defectSubscription`: subscribe the selected defect
  * `selectedRow`: record the selected row
  * row click event
    1. set previously selected defect unselected
    2. update `selectedRow`
    3. notify which defect is selected
* PanelComponent ([Plotly](https://plotly.com/javascript/))
  * draw defect locations as scatter markers
  * `defectSubscription`: subscribe the selected defect
  * `selectedPointNumber`: record the selected marker
  * marker click event
    1. reset all the marker styles
    2. set previously selected defect unselected
    3. update `selectedPointNumber`
    4. update the style of selected marker
    5. notify which defect is selected
* DefectDetailsComponent ([Angular Material Slider](https://material.angular.io/components/slider/overview))
  * slider change event
    * notify to update the severity of selected defect

## **Panel Setup Design**
* button ([Angular Material Button](https://material.angular.io/components/button/overview))
  * open dialog and send the current panel dimension
  * set new panel layout by the returned panel dimension from the dialog
  * all the defect data in the major components will be updated
* dialog (named as PanelSetupDialogComponent)
  * get panel dimension from the MainComponent
  * check if width and height inputs are valid
  * return the panel dimension to the MainComponent
