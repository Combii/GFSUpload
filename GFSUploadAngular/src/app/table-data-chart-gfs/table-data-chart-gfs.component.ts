import { Component, OnInit, ViewChild } from '@angular/core';
import { IBookKeeping } from '../../models/IbookKeeping';
import { ParserService } from '../services/Parser.service';
import { ListSorter } from '../services/ListSorter';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table-data-chart-gfs',
  templateUrl: './table-data-chart-gfs.component.html',
  styleUrls: ['./table-data-chart-gfs.component.css']
})
export class TableDataChartGfsComponent {
  dataList: IBookKeeping[] = [];

  loading = false;
  showOnlyErrors = false;
  areErrors = false;

  constructor(
    private parser: ParserService,
    private http: HttpClient
  ) {}

  onFileChange(evt: any) {
    this.loading = true;
    this.parser.parseFile(evt, 'chartGFS');
    this.parser.onFileParsedIBookKeeping.subscribe(rData => {
      this.dataList = rData;
      this.loading = false;

      this.areErrors = this.checkIfErrorsInArray(this.dataList);
    });
  }

  onClickShowErros() {
    this.showOnlyErrors = !this.showOnlyErrors;
    this.dataList = ListSorter.sortListForErrorsOnlyIBookKeeping(this.dataList);
  }

  getExtension(filename) {
    const parts = filename.split('.');
    return parts[parts.length - 1];
  }

  onClickSendToAPI() {
    console.log(this.dataList);
    this.http
      .post('http://localhost:5000/api/GfsChart', this.dataList)
      .subscribe(reponse => console.log(reponse));
  }

  checkIfErrorsInArray(listOfArray: IBookKeeping[]): boolean {
    return ListSorter.sortListForErrorsOnlyIBookKeeping(this.dataList).length > 0;
  }

}
