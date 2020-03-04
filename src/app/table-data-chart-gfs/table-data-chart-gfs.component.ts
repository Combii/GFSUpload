import { Component, OnInit, ViewChild } from '@angular/core';
import { IBookKeeping } from '../../models/IbookKeeping';
import { ParserService } from '../services/Parser.service';
import { ListSorter } from '../services/ListSorter';

@Component({
  selector: 'app-table-data-chart-gfs',
  templateUrl: './table-data-chart-gfs.component.html',
  styleUrls: ['./table-data-chart-gfs.component.css']
})
export class TableDataChartGfsComponent {
  dataList: IBookKeeping[] = [];

  loading = false;
  showOnlyErrors = false;

  constructor(
    private parser: ParserService
  ) {}

  onFileChange(evt: any) {
    this.loading = true;
    this.parser.parseFile(evt, 'chartGFS');
    this.parser.onFileParsedIBookKeeping.subscribe(rData => {
      this.dataList = rData;
      this.loading = false;
    });
  }

  onClickShowErros() {
    this.showOnlyErrors = !this.showOnlyErrors;
    this.dataList = ListSorter.sortListForErrorsOnlyIBookKeeping(this.dataList);
  }

  getExtension(filename) {
    const parts = filename.split('.');
    return parts[parts.length - 1];
  }

}
