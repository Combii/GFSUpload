import { Component, OnInit, ViewChild } from '@angular/core';
import { ExcelParserService } from '../services/excelParser.service';
import { IExcelBookKeeping } from 'src/models/IExcelBookKeeping';

@Component({
  selector: 'app-table-data-excel',
  templateUrl: './table-data-excel.component.html',
  styleUrls: ['./table-data-excel.component.css']
})
export class TableDataExcelComponent {
  data: IExcelBookKeeping[] = [];
  tempArrayData: IExcelBookKeeping[] = [];

  loading = false;
  showOnlyErrors = false;
  isTrue = false;

  constructor(private excelparser: ExcelParserService) {}

  onFileChange(evt: any) {
    this.loading = true;
    this.excelparser.parseFile(evt, 'excel');
    this.excelparser.onExcelFileParsedIExcelBookKeeping.subscribe(rData => {
      this.loading = false;
      this.data = rData;
    });
  }

  filterOnlyErrors() {
    this.data.forEach(rowData => {
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
    this.data = this.tempArrayData;
    // console.log(this.data);
  }

  onClickShowErros() {
    this.showOnlyErrors = !this.showOnlyErrors;
    this.filterOnlyErrors();
  }
}
