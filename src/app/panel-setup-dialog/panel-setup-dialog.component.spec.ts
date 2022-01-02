import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSetupDialogComponent } from './panel-setup-dialog.component';

describe('PanelSetupDialogComponent', () => {
  let component: PanelSetupDialogComponent;
  let fixture: ComponentFixture<PanelSetupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelSetupDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSetupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
