import { Component, OnInit, ViewChild } from '@angular/core';
import * as Papa from 'papaparse';
import { IBookKeeping } from '../../models/IbookKeeping';
import { ExcelParserService } from '../services/excelParser.service';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent {
  dataList: IBookKeeping[] = [];

  constructor(
    private excelparser: ExcelParserService
  ) {}

  onFileChange(evt: any) {
    this.excelparser.parseExcelFile(evt, 'csv');
    this.excelparser.onExcelFileParsedIBookKeeping.subscribe(rData => {
      this.dataList = rData;
    });
  }

  getExtension(filename) {
    const parts = filename.split('.');
    return parts[parts.length - 1];
  }
}
