import { Component, OnInit, ViewChild } from "@angular/core";
import * as Papa from "papaparse";

@Component({
  selector: "app-table-data",
  templateUrl: "./table-data.component.html",
  styleUrls: ["./table-data.component.css"]
})
export class TableDataComponent implements OnInit {

  name = "Angular 5 csv file parser example";
  dataList: any[];

  ngOnInit() {
    obj = this;
  }
  onChange(files: File[]) {
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
}
