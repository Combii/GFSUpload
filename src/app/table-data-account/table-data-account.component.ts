import { Component, OnInit, ViewChild } from '@angular/core';
import { ParserService } from '../services/Parser.service';
import { IAccountBookKeeping } from 'src/models/IAccountBookKeeping';
import { ActivatedRoute } from '@angular/router';
import { ListSorter } from '../services/ListSorter';

@Component({
  selector: 'app-table-data-account',
  templateUrl: './table-data-account.component.html',
  styleUrls: ['./table-data-account.component.css']
})
export class TableDataAccountComponent implements OnInit {
  data: IAccountBookKeeping[] = [];

  loading = false;
  showOnlyErrors = false;

  constructor(private parser: ParserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.route.queryParams
    //   .subscribe(params => {
    //     console.log(params.utg);
    //     console.log(params.bif);
    //     console.log(params.utgabif);
    //   })
  }

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
}
