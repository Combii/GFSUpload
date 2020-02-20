import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';

@Injectable({ providedIn: 'root' })
export class CSVParserService {

  dataList: IBookkeeping[];


    parseCSV(files: File[]): any[] {
        if (files[0]) {
            console.log(files[0]);
            Papa.parse(files[0], {
              header: true,
              skipEmptyLines: true,
              complete: (result, file) => {
                console.log(result);
                this.dataList = result.data;
              }
            }); 
    }


}
