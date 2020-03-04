import { Component, OnInit, ViewChild } from '@angular/core';
import { ParserService } from '../services/Parser.service';
import { IExcelBookKeeping } from 'src/models/IExcelBookKeeping';
import { ActivatedRoute } from '@angular/router';
import { ListSorter } from '../services/ListSorter';

@Component({
  selector: 'app-table-data-excel',
  templateUrl: './table-data-excel.component.html',
  styleUrls: ['./table-data-excel.component.css']
})
export class TableDataExcelComponent implements OnInit {
  data: IExcelBookKeeping[] = [];

  loading = false;
  showOnlyErrors = false;

  constructor(private parser: ParserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params.utg);
        console.log(params.bif);
        console.log(params.utgabif);
      })
  }

  onFileChange(evt: any) {
    this.loading = true;
    this.parser.parseFile(evt, 'account');
    this.parser.onExcelFileParsedIExcelBookKeeping.subscribe(rData => {
      this.loading = false;
      this.data = rData;
    });
  }

  onClickShowErros() {
    this.showOnlyErrors = !this.showOnlyErrors;
    this.data = ListSorter.sortListForErrorsOnlyIExcelBookKeeping(this.data);
  }
}
