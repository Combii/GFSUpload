import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';
import { IExcelBookKeeping } from '../../models/IExcelBookKeeping';

@Injectable({ providedIn: 'root' })
export class ExcelParserService {
  onXLSParsed = new Subject<IExcelBookKeeping[]>();

  private tempDataArr = [[], []];
  private dataList: IExcelBookKeeping[] = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };

  private isFirst = false;

  parseExcelFile(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = evt.target as DataTransfer;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.tempDataArr = XLSX.utils.sheet_to_json(ws, { header: 1 });

      this.insertDataIntoBookingList();
      //console.log(this.dataList);
      this.validateBookingsList();
      this.onXLSParsed.next(this.dataList);
    };

    reader.readAsBinaryString(target.files[0]);
  }

  insertDataIntoBookingList() {
    this.tempDataArr.forEach(row => {
      if (this.isFirst) {
          // Validation goes here
            this.dataList.push({
              AccountingDate: row[0],
              RegistrationNo: row[1],
              IDKT: row[2],
              OriginalIDKT: row[3],
              CounterAccountIDKT: row[4],
              Text: row[5],
              ProjectCode: row[6],
              Currency: row[7],
              Balance: row[8],
              errors : []
            });
      }
      this.isFirst = true;
    });
  }

  validateBookingsList() {


  }
}

// https://stackblitz.com/edit/angular-excel-read-table?file=src%2Fapp%2Fsheet.component.ts
