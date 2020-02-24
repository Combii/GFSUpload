import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataExcelComponent } from './table-data-excel.component';

describe('TableDataExcelComponent', () => {
  let component: TableDataExcelComponent;
  let fixture: ComponentFixture<TableDataExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDataExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDataExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
