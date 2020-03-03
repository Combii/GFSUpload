import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataCellComponent } from './table-data-cell.component';

describe('TableDataCellComponent', () => {
  let component: TableDataCellComponent;
  let fixture: ComponentFixture<TableDataCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDataCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDataCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
