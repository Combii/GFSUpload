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
  tempArrayData: IBookKeeping[] = [];

  loading = false;
  showOnlyErrors = false;

  isTrue = false;


  constructor(
    private parser: ParserService
  ) {}

  onFileChange(evt: any) {
    this.dataList = [];

    this.loading = true;
    this.parser.parseFile(evt, 'chartGFS');
    this.parser.onExcelFileParsedIBookKeeping.subscribe(rData => {
      this.dataList = rData;
      this.loading = false;
    });
  }

  filterOnlyErrors() {
    this.dataList.forEach(rowData => {
      Object.values(rowData.errors).forEach(error => {
        if (error.length > 0) {
          this.isTrue = true;
        }
      });
      if (this.isTrue) {
        this.tempArrayData.push(rowData);
      }
      this.isTrue = false;
    });
    this.dataList = this.tempArrayData;
    // console.log(this.data);
  }

  onClickShowErros() {
    this.showOnlyErrors = !this.showOnlyErrors;
    this.filterOnlyErrors();
  }

  getExtension(filename) {
    const parts = filename.split('.');
    return parts[parts.length - 1];
  }
  
}
