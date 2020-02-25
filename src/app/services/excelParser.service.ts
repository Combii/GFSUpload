import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExcelParserService {

  onXLSParsed = new Subject<any[][]>();

  private data = [[], []];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };

  parseExcelFile(evt: any) {
     /* wire up file reader */
     const target: DataTransfer =  (evt.target) as DataTransfer;
     if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }
     const reader: FileReader = new FileReader();
     reader.onload = (e: any) => {
       /* read workbook */
       const bstr: string = e.target.result;
       const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

       /* grab first sheet */
       const wsname: string = wb.SheetNames[0];
       const ws: XLSX.WorkSheet = wb.Sheets[wsname];

       /* save data */
       this.data =  (XLSX.utils.sheet_to_json(ws, { header: 1 }));
       this.onXLSParsed.next(this.data);
  };
     reader.readAsBinaryString(target.files[0]);
  }
}

// https://stackblitz.com/edit/angular-excel-read-table?file=src%2Fapp%2Fsheet.component.ts
