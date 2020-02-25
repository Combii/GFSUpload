import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ExcelParserService } from '../services/excelParser.service';

@Component({
  selector: 'app-table-data-excel',
  templateUrl: './table-data-excel.component.html',
  styleUrls: ['./table-data-excel.component.css']
})
export class TableDataExcelComponent {

  data = [[], []];

  constructor(private excelparser: ExcelParserService) { }



  onFileChange(evt: any) {
     this.excelparser.parseExcelFile(evt);
     this.excelparser.onXLSParsed.subscribe(rData => {
       this.data = rData;
     });
  }


}
