import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';
import { IAccountBookKeeping } from '../../models/IAccountBookKeeping';
import { Validations } from '../services/Validation';
import { IBookKeeping } from 'src/models/IbookKeeping';
import { CheckboxService } from './checkbox.service';

@Injectable({ providedIn: 'root' })
export class ParserService {
  onAccountFileParsedIAccountBookKeeping = new Subject<IAccountBookKeeping[]>();
  onFileParsedIBookKeeping = new Subject<IBookKeeping[]>();

  private tempDataArr = [[], []];
  dataListIAccountBookKeeping: IAccountBookKeeping[] = [];
  dataListIBookKeeping: IBookKeeping[] = [];

  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  isFirst = false;

  constructor(private checkBoxService : CheckboxService) {}

  parseFile(evt: any, type: string) {
    this.resetEveryList();

    // https://stackblitz.com/edit/angular-excel-read-table?file=src%2Fapp%2Fsheet.component.ts
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

      if (type === 'account') {
        this.insertDataIntoListIAccountBookKeeping();
        this.validateAccountBookingsList();

        this.onAccountFileParsedIAccountBookKeeping.next(
          this.dataListIAccountBookKeeping
        );
      }
      if (type === 'chartGFS') {
        this.insertDataIntoListIBookKeeping();
        this.validateBookingsList();

        this.onFileParsedIBookKeeping.next(this.dataListIBookKeeping);
      }
    };

    reader.readAsBinaryString(target.files[0]);
  }

  insertDataIntoListIAccountBookKeeping() {
    this.isFirst = false;
    this.tempDataArr.forEach(row => {
      if (this.isFirst) {
        if (row.length > 0) {
          this.dataListIAccountBookKeeping.push({
            AccountingDate: !row[0] ? '' : ''+row[0],
            RegistrationNo: !row[1] ? '' : ''+row[1],
            IDKT: !row[2] ? '' : ''+row[2],
            OriginalIDKT: !row[3] ? '' : ''+row[3],
            CounterAccountIDKT: !row[4] ? '' : ''+row[4],
            Text: !row[5] ? '' : ''+row[5],
            ProjectCode: !row[6] ? '' : ''+row[6],
            Currency: !row[7] ? '' : ''+row[7],
            Balance: !row[8] ? '' : ''+row[8]
          });
        }
      }
      this.isFirst = true;
    });
  }

  insertDataIntoListIBookKeeping() {
    this.isFirst = false;
    this.tempDataArr.forEach(row => {
      if (this.isFirst) {
        if (row.length > 0) {
          this.dataListIBookKeeping.push({
            Dato: !row[0] ? '' : ''+row[0],
            RegNr: !row[1] ? '' : ''+row[1],
            regnskabstype: !row[2] ? '' : ''+row[2],
            dkkbass: !row[3] ? '' : ''+row[3],
            skema_id: !row[4] ? '' : ''+row[4],
            skemarakke: !row[5] ? '' : ''+row[5],
            valutakod: !row[6] ? '' : ''+row[6],
            ldkd: !row[7] ? '' : ''+row[7],
            kngr: !row[8] ? '' : ''+row[8],
            kngr_typ: !row[9] ? '' : ''+row[9],
            pdst: !row[10] ? '' : ''+row[10],
            sum_rgopid: !row[11] ? '' : ''+row[11],
            opdater_lev: !row[12] ? '' : ''+row[12],
            leveran_kor: !row[13] ? '' : ''+row[13],
            leveran_type: !row[14] ? '' : ''+row[14],
            saldo: !row[15] ? '' : ''+row[15],
            Tekst: !row[16] ? '' : ''+row[16]
          });
        }
      }
      this.isFirst = true;
    });
  }

  validateAccountBookingsList() {
    console.log('CHECKBOX: ' + this.checkBoxService.bookInFebos + ' ' + this.checkBoxService.bookInFebosAndUploadToGfs + ' ' + this.checkBoxService.uploadToGfs + ' ')
    this.dataListIAccountBookKeeping.forEach(row => {
      row.errors = Validations.validateAccountBookKeepingError(row,this.checkBoxService);
    });
  }

  validateBookingsList() {
    this.dataListIBookKeeping.forEach(row => {
      row.errors = Validations.validateCSVBookKeeping(row);
    });
  }

  private resetEveryList(){
    this.onAccountFileParsedIAccountBookKeeping = new Subject<IAccountBookKeeping[]>();
    this.onFileParsedIBookKeeping = new Subject<IBookKeeping[]>();

    this.tempDataArr = [[], []];
    this.dataListIAccountBookKeeping = [];
    this.dataListIBookKeeping = [];
  }
}
