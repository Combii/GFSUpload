import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataChartGfsComponent } from './table-data-chart-gfs.component';

describe('TableDataChartGfsComponent', () => {
  let component: TableDataChartGfsComponent;
  let fixture: ComponentFixture<TableDataChartGfsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDataChartGfsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDataChartGfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
