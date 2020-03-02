import { Component, OnInit, ViewChild } from '@angular/core';
import * as Papa from 'papaparse';
import {IBookKeeping} from '../../models/IbookKeeping';
import {CSVParserService} from '../services/CSVParser.service';
import { ExcelParserService } from '../services/excelParser.service';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent {

  dataList: IBookKeeping[] = [];


  constructor(private csvParseService: CSVParserService, private excelparser: ExcelParserService) {

  }


  // Reads csv file
  onChange(files: File[]) {
    const ext = this.getExtension(files[0].name);
    console.log(ext);

    if(ext === 'csv'){
      this.csvParseService.parseCSV(files);
      this.dataList = this.csvParseService.dataList;
    }
    else{
      this.excelparser.parseFile(files, 'csv');
      this.excelparser.onExcelFileParsedIBookKeeping.subscribe(rData => {
        this.dataList = rData;
    });
    }
  }

   getExtension(filename) {
    const parts = filename.split('.');
    return parts[parts.length - 1];
  }
}
