import { Component, OnInit, ViewChild } from '@angular/core';
import * as Papa from 'papaparse';
import { IBookKeeping } from '../../models/IbookKeeping';
import { ParserService } from '../services/Parser.service';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent {
  dataList: IBookKeeping[] = [];

  constructor(
    private parser: ParserService
  ) {}

  onFileChange(evt: any) {
    this.parser.parseFile(evt, 'chartGFS');
    this.parser.onExcelFileParsedIBookKeeping.subscribe(rData => {
      this.dataList = rData;
    });
  }

  getExtension(filename) {
    const parts = filename.split('.');
    return parts[parts.length - 1];
  }
}
