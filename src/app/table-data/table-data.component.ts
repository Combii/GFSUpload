import { Component, OnInit, ViewChild } from '@angular/core';
import * as Papa from 'papaparse';
import {IBookKeeping} from '../../models/Ibookkeeping';
import {CSVParserService} from '../services/CSVParser.service';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent {

  dataList: IBookKeeping[];


  constructor(private csvParseService: CSVParserService) {

  }


  // Reads csv file
  onChange(files: File[]) {
  
    this.csvParseService.parseCSV(files);
    this.dataList = this.csvParseService.dataList;
    

  }
}
