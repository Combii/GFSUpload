import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import { IBookKeeping } from '../../models/IbookKeeping';
import { Validations } from '../services/Validation';

@Injectable({ providedIn: 'root' })
export class CSVParserService {
  dataList: IBookKeeping[] = [];

  parseCSV(files: File[]) {
    if (files[0]) {
      console.log(files[0]);
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (result, file) => {
          result.data.forEach(row => {
            this.dataList.push({
              Dato: row.Dato,
              regnskabstype: row.regnskabstype,
              skema_id: row.skema_id,
              RegNr: row.RegNr,
              dkkbass: row.dkkbass,
              skemarakke: row.skemarakke,
              valutakod: row.valutakod,
              ldkd: row.ldkd,
              kngr: row.kngr,
              kngr_typ: row.kngr_typ,
              pdst: row.pdst,
              sum_rgopid: row.sum_rgopid,
              opdater_lev: row.opdater_lev,
              leveran_kor: row.leveran_kor,
              leveran_type: row.leveran_type,
              saldo: row.saldo,
              Tekst: row.Tekst,
              errors : []
            });
          });
          this.validateBookingsList();
          console.log(this.dataList);
        }
      });
    }
  }

  validateBookingsList() {
    this.dataList.forEach(row => {
      row.errors = Validations.validateCSVBookKeeping(row);
    });

  }
}
