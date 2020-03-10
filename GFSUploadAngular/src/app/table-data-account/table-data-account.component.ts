import { Component, OnInit, ViewChild } from '@angular/core';
import { ParserService } from '../services/Parser.service';
import { IAccountBookKeeping } from 'src/models/IAccountBookKeeping';
import { ListSorter } from '../services/ListSorter';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table-data-account',
  templateUrl: './table-data-account.component.html',
  styleUrls: ['./table-data-account.component.css']
})
export class TableDataAccountComponent {
  data: IAccountBookKeeping[] = [];

  loading = false;
  showOnlyErrors = false;

  constructor(private parser: ParserService, private http: HttpClient) {}


  onFileChange(evt: any) {
    this.loading = true;
    this.parser.parseFile(evt, 'account');
    this.parser.onAccountFileParsedIAccountBookKeeping.subscribe(rData => {
      this.loading = false;
      this.data = rData;
    });
  }

  onClickShowErros() {
    this.showOnlyErrors = !this.showOnlyErrors;
    this.data = ListSorter.sortListForErrorsOnlyIExcelBookKeeping(this.data);
  }

  // If using Chrome you need to paste this in your url to get it to work
  // chrome://flags/#allow-insecure-localhost
  onClickSendToAPI(){
    this.http.post('http://localhost:5000/api/GFSAccount', this.data).subscribe(r => console.log('SENT POST WITH DATA ARRAY'));
  }
}
