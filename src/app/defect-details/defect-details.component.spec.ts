import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectDetailsComponent } from './defect-details.component';

describe('DefectDetailComponent', () => {
  let component: DefectDetailsComponent;
  let fixture: ComponentFixture<DefectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
