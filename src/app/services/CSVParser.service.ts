import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class CSVParserService {

    parseCSV(files:File[]) : any[] {
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
