import { Component, OnInit, ViewChild } from '@angular/core';
import { ParserService } from '../services/Parser.service';
import { IExcelBookKeeping } from 'src/models/IExcelBookKeeping';
import { ListSorter } from '../services/ListSorter';

@Component({
  selector: 'app-table-data-excel',
  templateUrl: './table-data-excel.component.html',
  styleUrls: ['./table-data-excel.component.css']
})
export class TableDataExcelComponent {
  data: IExcelBookKeeping[] = [];

  loading = false;
  showOnlyErrors = false;

  constructor(private parser: ParserService) {}

  onFileChange(evt: any) {
    this.loading = true;
    this.parser.parseFile(evt, 'account');
    this.parser.onExcelFileParsedIExcelBookKeeping.subscribe(rData => {
      this.loading = false;
      this.data = rData;
    });
  }

  onClickShowErros() {
    this.showOnlyErrors = !this.showOnlyErrors;
    this.data = ListSorter.sortListForErrorsOnlyIExcelBookKeeping(this.data);
  }
}
