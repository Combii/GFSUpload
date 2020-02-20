import { Component, OnInit, ViewChild } from "@angular/core";
import * as Papa from "papaparse";
import { CSVParserService } from "./services/CSVParser.service";

@Component({
  selector: "app-table-data",
  templateUrl: "./table-data.component.html",
  styleUrls: ["./table-data.component.css"]
})
export class TableDataComponent {

  dataList: any[];


  constructor(private csvParseService: CSVParserService) {

  }


  // Reads csv file
  onChange(files: File[]) {
    if (files[0]) {
      console.log(files[0]);
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        encoding: "UTF-8",
        complete: (result, file) => {
          console.log(result);
          this.dataList = result.data;
        }
      });
    }
  }
}
