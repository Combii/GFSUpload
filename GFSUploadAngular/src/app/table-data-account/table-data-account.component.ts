import { Component, OnInit, ViewChild } from '@angular/core';
import { ParserService } from '../services/Parser.service';
import { IAccountBookKeeping } from 'src/models/IAccountBookKeeping';
import { ListSorter } from '../services/ListSorter';

@Component({
  selector: 'app-table-data-account',
  templateUrl: './table-data-account.component.html',
  styleUrls: ['./table-data-account.component.css']
})
export class TableDataAccountComponent {
  data: IAccountBookKeeping[] = [];

  loading = false;
  showOnlyErrors = false;

  constructor(private parser: ParserService) {}


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

  onClickSendToAPI(){
    
  }
}
