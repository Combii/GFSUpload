import { Component, OnInit, ViewChild } from '@angular/core';
import { ParserService } from '../services/Parser.service';
import { IAccountBookKeeping } from 'src/models/IAccountBookKeeping';
import { IAccountBookKeepingAPI } from 'src/models/IAccountBookKeepingAPI';
import { ListSorter } from '../services/ListSorter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as fastJson from 'fast-json-stringify';

@Component({
  selector: 'app-table-data-account',
  templateUrl: './table-data-account.component.html',
  styleUrls: ['./table-data-account.component.css']
})
export class TableDataAccountComponent {
  data: IAccountBookKeeping[] = [];

  loading = false;
  showOnlyErrors = false;
  areErrors = false;

  constructor(private parser: ParserService, private http: HttpClient) {}


  onFileChange(evt: any) {
    this.loading = true;
    this.parser.parseFile(evt, 'account');
    this.parser.onAccountFileParsedIAccountBookKeeping.subscribe(rData => {
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
  onClickSendToAPI(){

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    // const newArray = this.removeErrorsArray(this.data);
    // console.log(JSON.stringify(newArray))


     const stringify = fastJson({
      type: 'object',
      properties: {
        AccountingDate: {
          type: 'string'
        },
        RegistrationNo: {
          type: 'string'
        },
        Currency: {
          type: 'string'
        },
        IDKT: {
          type: 'string'
        },
        OriginalIDKT: {
          type: 'string'
        },
        CounterAccountIDKT: {
          type: 'string'
        },
        ProjectCode: {
          type: 'string'
        },
        Balance: {
          type: 'string'
        },
        Text: {
          type: 'string'
        }
      }
    })


    const jsonString: string[] = [];

    this.data.forEach(element => {
      jsonString.push(stringify(this.data[0]));
    });

    console.log(JSON.stringify(jsonString))

    this.http.post('http://localhost:5000/api/GFSAccount',
    JSON.stringify(jsonString),
     httpOptions).subscribe(reponse =>
    console.log(reponse));
  }


  removeErrorsArray(accountBookKeepingArray: IAccountBookKeeping[]) : IAccountBookKeepingAPI[] {

    const dataAPI: IAccountBookKeepingAPI[] = [];

    accountBookKeepingArray.forEach(accountBooking => {
      dataAPI.push({
        AccountingDate: accountBooking.AccountingDate,
        RegistrationNo: accountBooking.RegistrationNo,
        IDKT: accountBooking.IDKT,
        OriginalIDKT: 'test',
        CounterAccountIDKT: accountBooking.CounterAccountIDKT,
        Text: accountBooking.Text,
        ProjectCode: accountBooking.ProjectCode,
        Currency: accountBooking.Currency,
        Balance: accountBooking.Balance
      });
    });

    return dataAPI;
  }

  checkIfErrorsInArray(listOfArray: IAccountBookKeeping[]): boolean {
    return ListSorter.sortListForErrorsOnlyIExcelBookKeeping(this.data).length > 0;
  }
}
