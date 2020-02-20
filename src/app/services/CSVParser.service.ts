import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import {IBookKeeping} from '../../models/Ibookkeeping';

@Injectable({ providedIn: 'root' })
export class CSVParserService {

  dataList: IBookKeeping[];


    parseCSV(files: File[]) {
        if (files[0]) {
            console.log(files[0]);
            Papa.parse(files[0], {
              header: true,
              skipEmptyLines: true,
              complete: (result, file) => {
                

                 result.data.forEach(row => {
                  this.dataList.push({
                    
                  })
                 })

                this.dataList = result.data;
              }
            }); 
    }


  }
}
