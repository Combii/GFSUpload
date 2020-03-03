import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-data-cell',
  templateUrl: './table-data-cell.component.html',
  styleUrls: ['./table-data-cell.component.css']
})
export class TableDataCellComponent implements OnInit {

  @Input('errors') errors: string[];
  @Input('data') data: string;
  @Input('last') last = false;



  constructor() {}

  ngOnInit() {}
}
