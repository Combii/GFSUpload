import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataAccountComponent } from './table-data-account.component';

describe('TableDataAccountComponent', () => {
  let component: TableDataAccountComponent;
  let fixture: ComponentFixture<TableDataAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDataAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDataAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
