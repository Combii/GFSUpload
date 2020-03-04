import {IExcelBookKeeping, IExcelBookKeepingError} from 'src/models/IExcelBookKeeping';
import { IBookKeeping, IBookKeepingError } from 'src/models/IbookKeeping';

export class Validations {

  static validateExcelBookKeeping(excelBookKeeping: IExcelBookKeeping): IExcelBookKeepingError {
    const errors: IExcelBookKeepingError = {
      AccountingDate: Validations.IsValidDate(excelBookKeeping.AccountingDate),
      RegistrationNo: Validations.IsValidRegNumber(
        excelBookKeeping.RegistrationNo
      ),
      Currency: Validations.IsValidCurrency(excelBookKeeping.Currency),
      IDKT: Validations.IsValidIDKT(excelBookKeeping.IDKT, false),
      OriginalIDKT: [],
      CounterAccountIDKT: [],
      ProjectCode: Validations.IsValidProjectCode(excelBookKeeping.ProjectCode),
      Balance: Validations.IsValidBalance(excelBookKeeping.Balance),
      Text: Validations.IsValidText(excelBookKeeping.Text)
    };

    return errors;
  }

  static validateCSVBookKeeping(csvBookKeeping: IBookKeeping): IBookKeepingError {
    const errors : IBookKeepingError = {
      Dato: Validations.IsValidDate(csvBookKeeping.Dato),
      valutakod: Validations.IsValidCurrency(csvBookKeeping.valutakod),
      RegNr: [],
      regnskabstype: [],
      dkkbass: [],
      skema_id: [],
      skemarakke: [],
      ldkd: [],
      kngr: [],
      kngr_typ: [],
      pdst: [],
      sum_rgopid: [],
      opdater_lev: [],
      leveran_kor: [],
      leveran_type: [],
      saldo: [],
      Tekst: []
    };
    return errors;
  }

  private static IsValidDate(date: string): string[] {
    const errorsArray = [];

    // https://stackoverflow.com/questions/10638529/how-to-parse-a-date-in-format-yyyymmdd-in-javascript
    if (!/^(\d){8}$/.test(date)) {
      errorsArray.push('Date must be 8 digits only');
    }

    const year = Number(date.toString().substring(0, 4));
    const month = Number(date.toString().substring(4, 6));
    const day = Number(date.toString().substring(6, 8));

    // console.log('Year ' + year);
    // console.log('Month ' + month);
    // console.log('Day ' + day);

    const parsedDate = new Date(year, month, day);

    // Check if sunday or saturday
    const dayOfWeek = parsedDate.getDay();

    // Saturday === 0
    // Sunday === 1
    if (dayOfWeek === 0 || dayOfWeek === 1) {
      errorsArray.push('Date cannot be saturday or sunday');
    }

    // Check if first of January
    const theMonth = parsedDate.getMonth();
    const dayOfMonth = parsedDate.getDate();

    if (month === 0 && dayOfMonth === 1) {
      errorsArray.push('Date cannot be first of January');
    }

    return errorsArray;
  }

  private static IsValidCurrency(currency: string): string[] {
    const errorsArray = [];

    if(typeof currency === 'undefined'){
      return errorsArray;
    }

    const specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (currency.toString().length !== 3) {
      errorsArray.push('Currency is not three chars long');
    }

    if (specialChar.test(currency)) {
      errorsArray.push('Currency includes special characters');
    }

    return errorsArray;
    // Cool API call to valid currencies. Could use for future use.
    // https://openexchangerates.org/api/currencies.json
  }

  private static IsValidRegNumber(regNumber: string): string[] {
    // This validation is not complete

    const errorsArray = [];

    const firstNumber = Number(regNumber.toString().substring(0, 2));
    const firstLastNumberOrChar = regNumber.toString().substring(2, 3);
    const secondLastNumberOrChar = regNumber.toString().substring(3, 4);

    if (regNumber.toString().length !== 4) {
      errorsArray.push('Is not 4 in length');
    }

    if (firstNumber < 30 || firstNumber > 49) {
      errorsArray.push('First two digits are not between 30 and 49');
    }

    if (
      isNaN(Number(firstLastNumberOrChar)) &&
      isNaN(Number(secondLastNumberOrChar))
    ) {
      errorsArray.push(
        'second last char and last char cannot both be digits or characters'
      );
    }

    if (
      !isNaN(Number(firstLastNumberOrChar)) &&
      !isNaN(Number(secondLastNumberOrChar))
    ) {
      errorsArray.push(
        'second last char and last char cannot both be digits or characters'
      );
    }

    return errorsArray;
  }

  private static IsValidIDKT(
    IDKT: string,
    isFebosOrBookingUpload: boolean
  ): string[] {
    const errorsArray = [];

    if (!Validations.isNotEmptyString(IDKT)) {
      errorsArray.push('Is empty');
    }

    if (isFebosOrBookingUpload) {
      if (IDKT.length > 10) {
        errorsArray.push('Is longer than 10 characters');
      }
    } else {
      if (IDKT.length > 14) {
        errorsArray.push('Is longer than 14 characters');
      }
    }
    return errorsArray;
  }

  private static IsValidProjectCode(projectCode: string): string[] {
    const errorsArray = [];

    if (!Validations.isNotEmptyString(projectCode)) {
      errorsArray.push('Is empty');
    }
    if (projectCode !== '078') {
      errorsArray.push('Project Code must be 078');
    }

    return errorsArray;
  }

  private static IsValidBalance(balance: string): string[] {
    // NOT DONE YET

    const errorsArray: string[] = [];

    if (balance.length > 16) {
      errorsArray.push('Balance must not exceed 16 characters');
    }

    if (!/^\d+(,\d+)?$/.test(balance)) {
      errorsArray.push('Is not a valid digit');
    }

    return errorsArray;
  }

  private static IsValidText(text: string): string[] {
    const errorsArray = [];

    if (!Validations.isNotEmptyString(text)) {
      errorsArray.push('Is empty');
    }
    if (text.length > 40) {
      errorsArray.push('Text must not be longer than 40 characters');
    }

    return errorsArray;
  }

  private static isNotEmptyString(dataString: string): boolean {
    if (dataString.length <= 0) {
      return false;
    }

    return true;
  }
}
