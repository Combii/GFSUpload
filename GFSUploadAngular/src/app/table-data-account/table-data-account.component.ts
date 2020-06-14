import { Component, OnInit, ViewChild } from '@angular/core';
import { ParserService } from '../services/Parser.service';
import { IAccountBookKeeping } from 'src/models/IAccountBookKeeping';
import { ListSorter } from '../services/ListSorter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as fastJson from 'fast-json-stringify';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-table-data-account',
  templateUrl: './table-data-account.component.html',
  styleUrls: ['./table-data-account.component.css'],
})
export class TableDataAccountComponent {
  data: IAccountBookKeeping[] = [];

  loading = false;
  showOnlyErrors = false;
  areErrors = false;
  backendReceivedData = false;

  constructor(private parser: ParserService, private http: HttpClient) {}

  onFileChange(evt: any) {
    this.loading = true;
    this.parser.parseFile(evt, 'account');
    this.parser.onAccountFileParsedIAccountBookKeeping.subscribe((rData) => {
      this.loading = false;
      this.data = rData;

      this.areErrors = this.checkIfErrorsInArray(this.data);
    });
  }

  onClickShowErros() {
    this.showOnlyErrors = !this.showOnlyErrors;
    this.data = ListSorter.sortListForErrorsOnlyIExcelBookKeeping(this.data);
  }

  // If using Chrome you need to paste this in your url to get it to work
  // chrome://flags/#allow-insecure-localhost
  onClickSendToAPI() {
    if (!this.areErrors) {
      this.http
        .post('http://localhost:5000/api/GFSAccount', this.data)
        .subscribe(_ => {
          this.backendReceivedData = true
          console.log(_);
        });
    }
  }

  checkIfErrorsInArray(listOfArray: IAccountBookKeeping[]): boolean {
    return (
      ListSorter.sortListForErrorsOnlyIExcelBookKeeping(this.data).length > 0
    );
  }
}
