import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ExcelParserService } from '../services/excelParser.service';
import { IExcelBookKeeping } from 'src/models/IExcelBookKeeping';

@Component({
  selector: 'app-table-data-excel',
  templateUrl: './table-data-excel.component.html',
  styleUrls: ['./table-data-excel.component.css']
})
export class TableDataExcelComponent {
  data: IExcelBookKeeping[] = [];
  loading = false;

  constructor(private excelparser: ExcelParserService) {}

  onFileChange(evt: any) {
    this.loading = true;
    this.excelparser.parseExcelFile(evt);
    this.excelparser.onExcelFileParsed.subscribe(rData => {
      this.loading = false;
      this.data = rData;
    });
  }
}
