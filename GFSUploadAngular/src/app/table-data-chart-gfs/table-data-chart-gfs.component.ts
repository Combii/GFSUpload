import { Component, OnInit, ViewChild } from '@angular/core';
import { IBookKeeping } from '../../models/IbookKeeping';
import { ParserService } from '../services/Parser.service';
import { ListSorter } from '../services/ListSorter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth/auth.service';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-table-data-chart-gfs',
  templateUrl: './table-data-chart-gfs.component.html',
  styleUrls: ['./table-data-chart-gfs.component.css'],
})
export class TableDataChartGfsComponent {
  dataList: IBookKeeping[] = [];

  loading = false;
  showOnlyErrors = false;
  areErrors = false;
  backendReceivedData = false;

  constructor(
    private parser: ParserService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  onFileChange(evt: any) {
    this.loading = true;
    this.parser.parseFile(evt, 'chartGFS');
    this.parser.onFileParsedIBookKeeping.subscribe((rData) => {
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
    this.authService.user.pipe(take(1)).subscribe((user) => {
      const headers = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${user.token}`);

      if (!this.areErrors) {
        this.http
          .post('http://localhost:5000/api/GfsChart', this.dataList, {
            headers,
          })
          .subscribe((_) => (this.backendReceivedData = true));
      }
    });
  }

  checkIfErrorsInArray(listOfArray: IBookKeeping[]): boolean {
    return (
      ListSorter.sortListForErrorsOnlyIBookKeeping(this.dataList).length > 0
    );
  }
}
