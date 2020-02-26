import { IExcelBookKeeping } from "src/models/IExcelBookKeeping";
import { IBookKeeping } from "src/models/Ibookkeeping";

export class Validations {
  static validateExcelBookKeeping(
    excelBookKeeping: IExcelBookKeeping
  ): IExcelBookKeeping {
    if (!Validations.IsValidDate(excelBookKeeping.AccountingDate)) {
      excelBookKeeping.errors.push({
        index: 0,
        errorMessage: "Date is wrong"
      });
    }

    if (!Validations.IsValidRegNumber(excelBookKeeping.RegistrationNo)) {
      excelBookKeeping.errors.push({
        index: 7,
        errorMessage: "Reg Number is invalid"
      });
    }

    if (!Validations.IsValidCurrency(excelBookKeeping.Currency)) {
      excelBookKeeping.errors.push({
        index: 7,
        errorMessage: "Currency is invalid"
      });
    }

    return excelBookKeeping;
  }

  static validateCSVBookKeeping(csvBookKeeping: IBookKeeping): IBookKeeping {
    if (!Validations.IsValidDate(csvBookKeeping.Dato)) {
      csvBookKeeping.errors.push({
        index: 0,
        errorMessage: "Date is wrong"
      });
    }

    if (!Validations.IsValidCurrency(csvBookKeeping.valutakod)) {
      csvBookKeeping.errors.push({
        index: 7,
        errorMessage: "Currency is invalid"
      });
    }

    return csvBookKeeping;
  }

  private static IsValidDate(date: string): boolean {
    // https://stackoverflow.com/questions/10638529/how-to-parse-a-date-in-format-yyyymmdd-in-javascript
    // Must a string of 8 digits only
    if (!/^(\d){8}$/.test(date)) {
      return false;
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
      return false;
    }

    // Check if first of January
    const theMonth = parsedDate.getMonth();
    const dayOfMonth = parsedDate.getDate();

    if (month === 0 && dayOfMonth === 1) {
      return false;
    }

    return true;
  }

  private static IsValidCurrency(currency: string): boolean {
    const specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (currency.length !== 3 || specialChar.test(currency)) {
      console.log(currency + " IS INVALID");
      return false;
    }
    return true;
    // Cool API call to valid currencies. Could use for future use.
    // https://openexchangerates.org/api/currencies.json
  }

  private static IsValidRegNumber(regNumber: string): boolean {
    const firstNumber = Number(regNumber.toString().substring(0, 2));
    const firstLastNumberOrChar = regNumber.toString().substring(2, 3);
    const secondLastNumberOrChar = regNumber.toString().substring(3, 4);

    if (regNumber.length !== 4 || firstNumber < 30 || firstNumber > 49) {
      return false;
    }

    if (
      isNaN(Number(firstLastNumberOrChar)) &&
      isNaN(Number(secondLastNumberOrChar))
    ) {
      return false;
    }

    if (
      !isNaN(Number(firstLastNumberOrChar)) &&
      !isNaN(Number(secondLastNumberOrChar))
    ) {
      return false;
    }

    return true;
  }
}
